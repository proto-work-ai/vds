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

@Directive({
  selector: 'form[data-calc-lead-form]',
  exportAs: 'calcLeadForm',
  standalone: true,
})
export class CalcLeadFormDirective {
  private readonly http = inject(HttpClient);
  private readonly contacts = inject(CONTACT_CONFIG);
  private readonly element: HTMLFormElement = inject(ElementRef<HTMLFormElement>).nativeElement;
  private readonly openedAt = Date.now();

  readonly form = new FormGroup({
    website: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    }),
    comment: new FormControl('', { nonNullable: true }),
    consent: new FormControl(true, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });

  readonly submitting = signal(false);
  readonly submitted = signal(false);

  @HostListener('submit', ['$event'])
  onSubmit(event: Event): void {
    event.preventDefault();
    this.submit();
  }

  private submit(): void {
    const inlineComment = this.element.querySelector('[data-inline-comment]');
    if (inlineComment instanceof HTMLInputElement)
      this.form.controls.comment.setValue(inlineComment.value.trim());

    const valid = markAsSubmit(this.form);
    this.updateFieldErrors();
    if (!valid || this.submitting()) return;

    this.submitting.set(true);
    const value = this.form.getRawValue();
    value.phone = toLocalPhone(value.phone);
    this.http
      .post<LeadResponse>('/api/lead.php', {
        ...value,
        description: value.comment,
        kind: 'designer',
        formTime: Date.now() - this.openedAt,
        pageTitle: document.title,
        pageUrl: location.href.split('#')[0],
      })
      .subscribe({
        next: (response) => {
          if (!response.ok) {
            this.submitting.set(false);
            this.showError(response.error || 'Не удалось отправить расчёт');
            return;
          }
          this.submitted.set(true);
          this.submitting.set(false);
          const done = document.createElement('div');
          done.className = 'form-done py-8 text-center';
          done.setAttribute('role', 'status');
          done.innerHTML =
            '<p class="mb-3 font-serif text-[30px] font-bold text-gold">Спасибо!</p><p class="text-[16px] leading-relaxed text-current opacity-80">Расчёт отправлен дизайнеру. Мы скоро с вами свяжемся.</p>';
          this.element.replaceWith(done);
        },
        error: () => {
          this.submitting.set(false);
          this.showError('Не удалось отправить расчёт. Попробуйте ещё раз или позвоните:', true);
        },
      });
  }

  private showError(message: string, withPhone = false): void {
    this.element.querySelector('[data-send-error]')?.remove();
    const error = document.createElement('p');
    error.className = 'text-[12px] text-[#c0392b]';
    error.setAttribute('role', 'alert');
    error.setAttribute('data-send-error', '');
    error.append(message);
    if (withPhone) {
      error.append(' ');
      const link = document.createElement('a');
      link.href = `tel:+${this.contacts.phone.replace(/\D/g, '')}`;
      link.textContent = this.contacts.phone;
      link.className = 'underline';
      error.append(link);
    }
    this.element.append(error);
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
}
