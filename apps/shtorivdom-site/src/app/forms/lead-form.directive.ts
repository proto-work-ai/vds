import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, HostListener, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { markAsSubmit } from '@atlas/core';
import { CONTACT_CONFIG } from '../contact-config';
import { toLocalPhone } from './phone-value';

interface LeadResponse {
  ok?: boolean;
  error?: string;
}

type LeadFormType = 'full' | 'phone';

@Directive({
  selector: 'form[data-lead-form]:not([data-angular-lead])',
  exportAs: 'leadForm',
  standalone: true,
})
export class LeadFormDirective {
  private readonly http = inject(HttpClient);
  private readonly contacts = inject(CONTACT_CONFIG);
  private readonly element: HTMLFormElement = inject(ElementRef<HTMLFormElement>).nativeElement;
  private readonly openedAt = Date.now();

  readonly form = new FormGroup({
    website: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^(?:\D*\d){10,11}\D*$/)],
    }),
    email: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true }),
    theme: new FormControl('', { nonNullable: true }),
    comment: new FormControl('', { nonNullable: true }),
    consent: new FormControl(true, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });

  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly error = signal('');

  constructor() {
    this.element.setAttribute('data-angular-lead', '');
    const formType = (this.element.getAttribute('data-lead-type') || 'phone') as LeadFormType;
    if (formType === 'full') {
      this.form.controls.name.addValidators(Validators.required);
      this.form.controls.name.updateValueAndValidity();
    }
  }

  @HostListener('submit', ['$event'])
  onSubmit(event: Event): void {
    event.preventDefault();
    const inlineComment = this.element.querySelector('[data-inline-comment]');
    if (inlineComment instanceof HTMLInputElement)
      this.form.controls.comment.setValue(inlineComment.value.trim());
    const valid = markAsSubmit(this.form);
    this.updateFieldErrors();
    this.element
      .querySelector('[data-error="phone"]')
      ?.classList.toggle('hidden', !this.form.controls.phone.invalid);
    this.element
      .querySelector('[data-error="consent"]')
      ?.classList.toggle('hidden', !this.form.controls.consent.invalid);
    if (!valid || this.submitting()) return;

    this.submitting.set(true);
    this.error.set('');
    const value = this.form.getRawValue();
    const model =
      this.element.getAttribute('data-order-model') ||
      this.element.querySelector('[name="model"]')?.getAttribute('value') ||
      undefined;
    const leadForm = this.element.getAttribute('data-lead-form');
    const kind =
      leadForm ||
      (model
        ? 'curtain-rod'
        : this.element.id === 'form-partner'
          ? 'partner'
          : location.pathname.startsWith('/contact')
            ? 'contact'
            : 'order');
    value.phone = toLocalPhone(value.phone);

    this.http
      .post<LeadResponse>('/api/lead.php', {
        ...value,
        description: value.comment,
        model,
        kind,
        formTime: Date.now() - this.openedAt,
        pageTitle: document.title,
        pageUrl: location.href.split('#')[0],
      })
      .subscribe({
        next: (response) => {
          if (!response.ok) {
            this.error.set(response.error || 'Не удалось отправить заявку');
            this.submitting.set(false);
            this.showError(this.error());
            return;
          }

          this.submitted.set(true);
          this.submitting.set(false);
          const done = document.createElement('div');
          done.className = 'form-done py-8 text-center';
          done.setAttribute('data-form-done', '');
          done.setAttribute('role', 'status');
          done.innerHTML =
            '<p class="mb-3 font-serif text-[30px] font-bold text-gold">Спасибо!</p><p class="text-[16px] leading-relaxed text-current opacity-80">Ваша заявка успешно отправлена! Мы скоро с вами свяжемся.</p>';
          if (this.element.hasAttribute('data-preserve-form')) {
            this.element.hidden = true;
            this.element.insertAdjacentElement('afterend', done);
          } else {
            this.element.replaceWith(done);
          }
          this.element.dispatchEvent(new CustomEvent('lead-sent'));
        },
        error: () => {
          this.error.set('Не удалось отправить заявку. Попробуйте ещё раз или позвоните:');
          this.submitting.set(false);
          this.showError(this.error(), this.contacts.phone);
        },
      });
  }

  reset(): void {
    this.element.parentElement?.querySelector('[data-form-done]')?.remove();
    this.element.hidden = false;
    this.form.reset({ consent: true });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.submitting.set(false);
    this.submitted.set(false);
    this.error.set('');
    this.element.querySelector('[data-send-error]')?.remove();
    this.updateFieldErrors();
  }

  @HostListener('input', ['$event.target'])
  onInput(target: EventTarget | null): void {
    if (target instanceof HTMLElement && target.hasAttribute('formcontrolname')) {
      this.updateFieldErrors();
    }
  }

  private updateFieldErrors(): void {
    for (const name of ['name', 'phone', 'consent'] as const) {
      const control = this.form.controls[name];
      const field = this.element.querySelector(`[formcontrolname="${name}"]`);
      if (!(field instanceof HTMLElement)) continue;
      const invalid = control.invalid && (control.touched || control.dirty);
      field.classList.toggle('lead-field-error', invalid);
      field.toggleAttribute('aria-invalid', invalid);
      field.closest('tui-textfield')?.classList.toggle('lead-field-error', invalid);
    }
  }

  private showError(message: string, phone?: string): void {
    this.element.querySelector('[data-send-error]')?.remove();
    const error = document.createElement('p');
    error.className = 'text-[12px] text-[#c0392b]';
    error.setAttribute('role', 'alert');
    error.setAttribute('data-send-error', '');
    error.append(message);
    if (phone) {
      error.append(' ');
      const link = document.createElement('a');
      link.href = `tel:+${phone.replace(/\D/g, '')}`;
      link.textContent = phone;
      link.className = 'underline';
      error.append(link);
    }
    this.element.append(error);
  }
}
