import { ChangeDetectionStrategy, Component, computed, inject, input, resource } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Mail {
  subject: string;
  html: string;
  text: string;
}

interface EmailApi {
  KINDS: string[];
  buildLeadEmail(kind: string, data: object, meta: object): Mail;
  buildClientEmail(kind: string, data: object): Mail | null;
}

export const EMAIL_KINDS = ['callback', 'designer', 'order', 'contact', 'partner', 'curtain-rod'] as const;
export type EmailKind = (typeof EMAIL_KINDS)[number];

/** Тестовые данные — как SAMPLES в mockups/site/emails/index.html */
const SAMPLES: Record<EmailKind, { data: object; meta: object }> = {
  callback: { data: { phone: '9255946117' }, meta: { pageTitle: 'Шторы на заказ в Москве — пошив и дизайн штор | Shtorivdom', pageUrl: 'https://shtorivdom.ru/' } },
  designer: { data: { name: 'Анна', phone: '+7 (916) 123-45-67', connectionType: 'Telegram' }, meta: { pageTitle: 'Шторы на заказ в Москве — пошив и дизайн штор | Shtorivdom', pageUrl: 'https://shtorivdom.ru/' } },
  order: { data: { name: 'Ольга Петрова', phone: '89031234567', email: 'olga@example.ru', type: 'Блэкаут', size: 18, description: 'Гостиная, два окна.\nХочется плотные шторы и тюль.' }, meta: { pageTitle: 'Шторы блэкаут на заказ | Shtorivdom', pageUrl: 'https://shtorivdom.ru/catalog/blackout-curtains/' } },
  contact: { data: { name: 'Игорь', theme: 'Сроки изготовления', email: 'igor@example.ru', description: 'Сколько по времени шьются римские шторы на три окна?' }, meta: { pageTitle: 'Контакты | Shtorivdom', pageUrl: 'https://shtorivdom.ru/contact/' } },
  partner: { data: { name: 'Марина, дизайнер интерьеров', phone: '9161112233', city: 'Подольск', email: 'marina@example.ru', description: 'Веду 3–4 объекта в месяц, ищу надёжный цех.' }, meta: { pageTitle: 'Стать партнером | Shtorivdom', pageUrl: 'https://shtorivdom.ru/partner/' } },
  'curtain-rod': { data: { phone: '9998887766', model: 'Карниз 3', description: 'Интересует: Карниз 3\nОкно 2,4 м', email: 'client@example.ru' }, meta: { pageTitle: 'Карниз 3 | Shtorivdom', pageUrl: 'https://shtorivdom.ru/catalog/curtain-rods/3/' } },
};

let api: Promise<EmailApi> | undefined;
const loadApi = () =>
  (api ??= new Promise<EmailApi>((resolve, reject) => {
    const w = window as unknown as { ShtorivdomEmail?: EmailApi };
    if (w.ShtorivdomEmail) return resolve(w.ShtorivdomEmail);
    const s = document.createElement('script');
    s.src = 'site-assets/email.js';
    s.onload = () => (w.ShtorivdomEmail ? resolve(w.ShtorivdomEmail) : reject(new Error('email.js не создал ShtorivdomEmail')));
    s.onerror = () => reject(new Error('Не загрузился site-assets/email.js'));
    document.head.appendChild(s);
  }));

/** Письмо из mockups/site/assets/email.js в iframe, как в галерее mockups/site/emails. */
@Component({
  selector: 'app-email-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-[700px] p-4">
      @if (mail.value(); as m) {
        <p class="mb-1 text-[12px] font-bold tracking-[.15em] text-gold
          uppercase">{{ to() === 'client' ? 'Письмо клиенту' : 'Письмо в салон' }} · {{ kind() }}</p>
        <p class="mb-3 font-serif text-[18px] font-bold">Тема: {{ m.subject }}</p>
        <iframe title="Письмо" class="h-[1100px] w-full border border-navy/10 bg-white" [srcdoc]="m.safe"></iframe>
      } @else if (mail.status() === 'resolved') {
        <p class="border border-dashed border-gold px-4 py-3 text-[14px]
          text-slate">В тестовых данных нет email — письмо клиенту для «{{ kind() }}» не отправляется.</p>
      } @else if (mail.error()) {
        <p class="text-[#c0392b]">{{ mail.error() }}</p>
      }
    </div>
  `,
})
export class EmailPreview {
  readonly kind = input<EmailKind>('order');
  readonly to = input<'salon' | 'client'>('salon');
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _params = computed(() => ({ kind: this.kind(), to: this.to() }));

  protected readonly mail = resource({
    params: this._params,
    loader: async ({ params }) => {
      const e = await loadApi();
      const s = SAMPLES[params.kind];
      const mail = params.to === 'client' ? e.buildClientEmail(params.kind, s.data) : e.buildLeadEmail(params.kind, s.data, { ...s.meta, sentAt: '2026-09-14T12:30:00Z' });
      return mail && { ...mail, safe: this._sanitizer.bypassSecurityTrustHtml(mail.html) as SafeHtml };
    },
  });
}
