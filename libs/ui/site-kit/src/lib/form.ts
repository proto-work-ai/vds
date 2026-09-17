import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, inject, input, linkedSignal, model, output } from '@angular/core';
import { SiteButton } from './button.directive';
import { SiteIcon } from './icon.component';

const digits = (v: string) => v.replace(/\D/g, '');

/** Маска телефона site.js: +7 (___) ___-__-__, восьмёрка в начале заменяется на 7. */
export function sitePhoneMask(value: string): string {
  let d = digits(value);
  if (!d) return '';
  if (d[0] === '8') d = '7' + d.slice(1);
  if (d[0] !== '7') d = '7' + d;
  d = d.slice(0, 11);
  const p = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
  return '+7' + (p[0] ? ` (${p[0]}` : '') + (p[0].length === 3 ? ')' : '') + (p[1] ? ` ${p[1]}` : '') + (p[2] ? `-${p[2]}` : '') + (p[3] ? `-${p[3]}` : '');
}

export const sitePhoneComplete = (value: string) => digits(value).length === 11;

/** Поле формы .field: состояние ошибки — красная рамка. */
@Directive({
  selector: 'input[siteField], textarea[siteField]',
  host: { class: 'field', '[class.is-error]': 'error()', '[class.resize-none]': 'isTextarea' },
})
export class SiteField {
  readonly error = input(false);
  protected readonly isTextarea = inject(ElementRef).nativeElement.tagName === 'TEXTAREA';
}

@Directive({
  selector: 'input[sitePhoneMask]',
  host: { type: 'tel', inputmode: 'tel', autocomplete: 'tel', '(input)': 'onInput()' },
})
export class SitePhoneMask {
  readonly value = model('', { alias: 'sitePhoneMask' });
  private readonly _el: HTMLInputElement = inject(ElementRef).nativeElement;

  onInput(): void {
    this._el.value = sitePhoneMask(this._el.value);
    this.value.set(this._el.value);
  }
}

/** Чекбокс согласия со ссылкой на страницу согласия и текстом ошибки. */
@Component({
  selector: 'site-consent',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <label class="flex items-start gap-3 text-[14px] leading-snug text-slate">
      <input type="checkbox" name="consent" class="mt-0.5 size-4 shrink-0 accent-[#0d223d]" [checked]="checked()" (change)="toggle($event)"
        />
      <span>Я соглашаюсь с правилами по обработке <a class="text-navy underline decoration-gold underline-offset-2 hover:text-gold"
        [href]="href()">персональных данных</a></span>
    </label>
    @if (error()) {<p class="mt-2 text-[13px] text-[#c0392b]">Нужно согласие на обработку персональных данных</p>}
  `,
})
export class SiteConsent {
  readonly checked = model(true); // согласие отмечено по умолчанию (решение владельца)
  readonly error = model(false);
  readonly href = input('soglasie-na-obrabotku-personalnyh-dannyh/');

  toggle(event: Event): void {
    const on = (event.target as HTMLInputElement).checked;
    this.checked.set(on);
    if (on) this.error.set(false);
  }
}

export type SiteLeadFormVariant = 'lead' | 'hero' | 'partner';
export type SiteLeadFormState = 'idle' | 'errors' | 'done';

export interface SiteLeadData {
  name?: string;
  phone: string;
  city?: string;
  comment?: string;
}

/**
 * Форма заявки: lead — общая (#lead), hero — первый экран (подчёркнутые поля с иконками),
 * partner — анкета партнёра. Проверка телефона и согласия, «Спасибо!» вместо формы.
 */
@Component({
  selector: 'site-lead-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, SiteButton, SiteConsent, SiteField, SiteIcon, SitePhoneMask],
  host: { class: 'block' },
  template: `
    @if (done()) {
      <div class="form-done is-in py-8 text-center" role="status">
        <p class="mb-3 font-serif text-[30px] font-bold text-gold">Спасибо!</p>
        <p class="text-[16px] leading-relaxed text-slate">Ваша заявка успешно отправлена! Мы скоро с вами свяжемся.</p>
      </div>
    } @else {
      <form novalidate [class]="variant() === 'hero' ? 'flex flex-col gap-6' : 'flex flex-col gap-5'" (submit)="submit($event)">
        @if (variant() === 'hero') {
          <label class="flex items-center gap-3 border-b border-gold pb-3">
            <site-icon name="user" class="text-gold" />
            <input name="name" type="text" autocomplete="name" placeholder="Введите имя"
              class="h-10 w-full bg-transparent text-[16px] outline-none placeholder:text-slate/60" [value]="name()"
                (input)="name.set(val($event))" />
          </label>
          <div>
            <label class="flex items-center gap-3 border-b border-gold pb-3" [style.border-color]="phoneError() ? '#c0392b' : null">
              <site-icon name="phone" class="text-gold" />
              <input #phoneInput name="phone" placeholder="Укажите телефон"
                class="h-10 w-full bg-transparent text-[16px] outline-none placeholder:text-slate/60" [value]="phone()"
                  [(sitePhoneMask)]="phone" (input)="phoneError.set(false)" />
            </label>
            @if (phoneError()) {<p class="mt-2 text-[13px] text-[#c0392b]">Введите номер телефона полностью</p>}
          </div>
        } @else {
          @if (variant() === 'partner') {
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="field-label" [attr.for]="id + '-name'">Имя</label>
                <input siteField name="name" type="text" autocomplete="name" placeholder="Введите имя" [id]="id + '-name'" [value]="name()"
                  (input)="name.set(val($event))" />
              </div>
              <ng-container *ngTemplateOutlet="phoneField" />
            </div>
            <div>
              <label class="field-label" [attr.for]="id + '-city'">Город</label>
              <input siteField name="city" type="text" autocomplete="address-level2" placeholder="Город" [id]="id + '-city'"
                [value]="city()" (input)="city.set(val($event))" />
            </div>
          } @else {
            <ng-container *ngTemplateOutlet="phoneField" />
          }
          <div>
            <label class="field-label" [attr.for]="id + '-comment'">Комментарий</label>
            <textarea siteField name="comment" rows="3" placeholder="Комментарий" [id]="id + '-comment'" [value]="comment()"
              (input)="comment.set(val($event))"></textarea>
          </div>
        }
        <site-consent [href]="consentHref()" [(checked)]="consent" [(error)]="consentError" />
        @if (variant() === 'hero') {<button type="submit" siteButton class="w-full">Отправить</button>} @else {<button type="submit"
          siteButton class="mt-2 w-full sm:w-auto sm:self-end">Отправить</button>}
      </form>
    }
    <ng-template #phoneField>
      <div>
        <label class="field-label" [attr.for]="id + '-phone'">Телефон *</label>
        <input siteField name="phone" placeholder="Укажите телефон" [id]="id + '-phone'" [error]="phoneError()" [value]="phone()"
          [(sitePhoneMask)]="phone" (input)="phoneError.set(false)" />
        @if (phoneError()) {<p class="mt-2 text-[13px] text-[#c0392b]">Введите номер телефона полностью</p>}
      </div>
    </ng-template>
  `,
})
export class SiteLeadForm {
  readonly variant = input<SiteLeadFormVariant>('lead');
  readonly consentHref = input('soglasie-na-obrabotku-personalnyh-dannyh/');
  readonly name = model('');
  readonly phone = model('');
  readonly city = model('');
  readonly comment = model('');
  readonly consent = model(true); // согласие отмечено по умолчанию (решение владельца)
  /** Начальное состояние для витрины: ошибки проверки или «Спасибо». */
  readonly state = input<SiteLeadFormState>('idle');
  readonly phoneError = linkedSignal(() => this.state() === 'errors');
  readonly consentError = linkedSignal(() => this.state() === 'errors');
  readonly done = linkedSignal(() => this.state() === 'done');
  readonly submitted = output<SiteLeadData>();

  protected readonly id = 'lead-' + Math.random().toString(36).slice(2, 8);

  val(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  submit(event: Event): void {
    event.preventDefault();
    const badPhone = !sitePhoneComplete(this.phone());
    this.phoneError.set(badPhone);
    this.consentError.set(!this.consent());
    if (badPhone || !this.consent()) return;
    this.submitted.emit({ name: this.name() || undefined, phone: this.phone(), city: this.city() || undefined, comment: this.comment() || undefined });
    this.done.set(true);
  }
}

/** Секция «Заявка» (partials/lead-form.html): тексты и контакты слева, форма в белой карточке справа. */
@Component({
  selector: 'site-lead-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteIcon, SiteLeadForm],
  host: { class: 'block bg-sand py-16 sm:py-24' },
  template: `
    <div class="wrap grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
      <div>
        <p class="eyebrow">Заявка</p>
        <h2 class="h2 mb-5">Запишитесь на посещение шоурума и получите <span class="text-gold italic">скидку 10%</span></h2>
        <div class="mb-10 space-y-3 text-[16px] leading-[1.8] font-light text-slate">
          <p>Бесплатно осуществим выезд в любой район Москвы и МО в удобный для Вас день и время.</p>
          <p>На встрече продемонстрируем все образцы материалов, произведём замеры, поможем с выбором модели и рассчитаем стоимость в разных
            ценовых категориях.</p>
          <p>Изготовим заказ на собственном производстве точно в срок, произведем монтаж.</p>
        </div>
        <ul class="flex flex-col gap-6">
          @for (c of contacts; track c.label) {
            <li class="flex gap-4">
              <span class="mt-1 text-gold"><site-icon [name]="c.icon" /></span>
              <div>
                <p class="mb-1 text-[12px] font-bold tracking-[.12em] text-gold uppercase">{{ c.label }}</p>
                @if (c.href) {<a class="text-[16px] hover:text-gold" [href]="c.href">{{ c.text }}</a>} @else {<p
                  class="text-[16px]">{{ c.text }}</p>}
              </div>
            </li>
          }
        </ul>
      </div>
      <div class="rounded-[4px] border border-navy/5 bg-white px-5 py-8 shadow-[0_8px_40px_rgb(13_34_61/.08)] sm:px-10 sm:py-12">
        <site-lead-form [state]="state()" />
      </div>
    </div>
  `,
})
export class SiteLeadSection {
  readonly state = input<SiteLeadFormState>('idle');
  protected readonly contacts = [
    { icon: 'phone' as const, label: 'Телефон', text: '+7 (915) 359-12-00', href: 'tel:+79153591200' },
    { icon: 'mail' as const, label: 'Эл. почта', text: 'info@shtorivdom.ru', href: 'mailto:info@shtorivdom.ru' },
    { icon: 'pin' as const, label: 'Адрес', text: 'Троицк, Кварцевая улица, 3, корп. 2', href: '' },
    { icon: 'clock' as const, label: 'График работы', text: 'Без выходных, 10:00–20:00', href: '' },
  ];
}

