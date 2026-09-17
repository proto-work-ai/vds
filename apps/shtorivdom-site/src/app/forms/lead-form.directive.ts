import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, HostListener, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CONTACT_CONFIG } from '../contact-config';

interface LeadResponse {
  ok?: boolean;
  error?: string;
}

@Directive({
  selector: 'form[data-lead-form]:not([data-angular-lead])',
  exportAs: 'leadForm',
  standalone: true,
})
export class LeadFormDirective {
  private readonly http = inject(HttpClient);
  private readonly contacts = inject(CONTACT_CONFIG);
  private readonly element = inject(ElementRef<HTMLFormElement>).nativeElement;
  private readonly openedAt = Date.now();

  readonly form = new FormGroup({
    website: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
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
  }

  @HostListener('submit', ['$event'])
  onSubmit(event: Event): void {
    event.preventDefault();
    const inlineComment = this.element.querySelector('[data-inline-comment]');
    if (inlineComment instanceof HTMLInputElement)
      this.form.controls.comment.setValue(inlineComment.value.trim());
    this.form.markAllAsTouched();
    this.element
      .querySelector('[data-error="phone"]')
      ?.classList.toggle('hidden', !this.form.controls.phone.invalid);
    this.element
      .querySelector('[data-error="consent"]')
      ?.classList.toggle('hidden', !this.form.controls.consent.invalid);
    if (this.form.invalid || this.submitting()) return;

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
          done.setAttribute('role', 'status');
          done.innerHTML =
            '<p class="mb-3 font-serif text-[30px] font-bold text-gold">Спасибо!</p><p class="text-[16px] leading-relaxed text-slate">Ваша заявка успешно отправлена! Мы скоро с вами свяжемся.</p>';
          this.element.replaceWith(done);
          this.element.dispatchEvent(new CustomEvent('lead-sent'));
        },
        error: () => {
          this.error.set(
            `Не удалось отправить заявку. Попробуйте ещё раз или позвоните: ${this.contacts.phone}`,
          );
          this.submitting.set(false);
          this.showError(this.error());
        },
      });
  }

  private showError(message: string): void {
    this.element.querySelector('[data-send-error]')?.remove();
    const error = document.createElement('p');
    error.className = 'text-[13px] text-[#c0392b]';
    error.setAttribute('role', 'alert');
    error.setAttribute('data-send-error', '');
    error.textContent = message;
    this.element.append(error);
  }
}
