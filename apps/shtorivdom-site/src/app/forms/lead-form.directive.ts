import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, HostListener, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { toLocalPhone } from './phone-value';
import { DestroyRef } from '@angular/core';

interface LeadResponse {
  ok?: boolean;
  error?: string;
}

@Directive({
  selector: 'form[data-lead-form]',
  exportAs: 'leadForm',
  host: { '[style.display]': 'submitted() ? "none" : null', '[attr.aria-busy]': 'submitting()' },
})
export class LeadFormDirective {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly element = inject(ElementRef<HTMLFormElement>).nativeElement;
  private openedAt = Date.now();
  public readonly calculationSummary = input('');
  public readonly leadDescription = input('');
  public readonly orderModel = input('', { alias: 'data-order-model' });
  public readonly kind = input('', { alias: 'data-lead-form' });
  public readonly form = new FormGroup({
    website: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
    }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.email] }),
    city: new FormControl('', { nonNullable: true }),
    theme: new FormControl('', { nonNullable: true }),
    comment: new FormControl('', { nonNullable: true }),
    consent: new FormControl(true, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });
  public readonly submitting = signal(false);
  public readonly submitted = signal(false);
  public readonly error = signal('');
  private readonly calc = this.element.hasAttribute('data-calc-lead-form');
  public readonly successMessage = this.calc
    ? 'Расчёт отправлен дизайнеру. Мы скоро с вами свяжемся.'
    : 'Ваша заявка успешно отправлена! Мы скоро с вами свяжемся.';

  public chooseModel(model: string): void {
    if (!this.form.controls.comment.value)
      this.form.controls.comment.setValue(`Интересует: ${model}`);
  }

  @HostListener('submit', ['$event'])
  public onSubmit(event: Event): void {
    event.preventDefault();
    if (this.submitting() || this.submitted()) return;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const description = this.calculationSummary() || this.leadDescription() || value.comment;
    const location = this.document.location;
    const kind =
      this.kind() ||
      (this.calc
        ? 'designer'
        : this.orderModel()
          ? 'curtain-rod'
          : this.element.id === 'form-partner'
            ? 'partner'
            : location.pathname.startsWith('/contact')
              ? 'contact'
              : 'order');
    this.submitting.set(true);
    this.error.set('');
    this.http
      .post<LeadResponse>('/api/lead.php', {
        ...value,
        phone: toLocalPhone(value.phone),
        comment: description,
        description,
        model: this.orderModel() || undefined,
        kind,
        formTime: Date.now() - this.openedAt,
        pageTitle: this.document.title,
        pageUrl: location.href.split('#')[0],
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.submitting.set(false);
          if (response.ok) {
            this.submitted.set(true);
            const analytics = this.document.defaultView as
              | (Window & { ym?: (id: number, action: string, goal: string) => void })
              | null;
            analytics?.ym?.(108545164, 'reachGoal', 'form-submit');
          } else
            this.error.set(response.error || 'Не удалось отправить заявку. Попробуйте ещё раз.');
        },
        error: () => {
          this.submitting.set(false);
          this.error.set('Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.');
        },
      });
  }

  public reset(): void {
    if (this.submitting()) return;
    this.form.reset({ consent: true });
    this.submitted.set(false);
    this.error.set('');
    this.openedAt = Date.now();
  }
}
