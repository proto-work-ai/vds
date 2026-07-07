/* eslint-disable @angular-eslint/directive-selector */
import { ChangeDetectionStrategy, Component, DestroyRef, Directive, HostListener, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { injectContext, PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { provideIcons } from '@ng-icons/core';
import { lucideDelete, lucideX } from '@ng-icons/lucide';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { markAsSubmit } from '@atlas/core';
import { IFormData, injectSendMessage } from '../../modules/send-service/send.services';
import { finalize } from 'rxjs';
import { FormImports } from '../form';

export function ymInviteEvent(): void {
  const { ym } = window as any;
  if (ym) {
    ym(108545164, 'reachGoal', 'any-questions');
  }
}

@Directive({ selector: '[consultationModalClick]' })
export class ConsultationModalClick {
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogService = inject(TuiDialogService);

  @HostListener('click') protected onInvite(): void {
    this.dialogService
      .open<string>(new PolymorpheusComponent(ConsultationModal), {
        size: 'm',
        // appearance: 'fullscreen',
        data: {},
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}

@Component({
  styleUrl: 'consultation-modal.scss',
  templateUrl: 'consultation-modal.html',
  imports: [FormImports],
  providers: [
    provideIcons({
      lucideDelete,
      lucideX,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationModal {
  private readonly sendForm = injectSendMessage(ymInviteEvent);
  protected readonly context = injectContext<TuiDialogContext<boolean, any>>();
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly typeOptions = signal(['Звонок', 'Telegram', 'Max']);

  protected readonly form = new FormGroup({
    name: new FormControl(undefined, [Validators.required, Validators.minLength(1)]),
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    connectionType: new FormControl(this.typeOptions()[0], []),
    checked: new FormControl(true, [Validators.requiredTrue]),
  });

  protected modalClose(result = false): void {
    this.context.completeWith(result);
  }

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      this.sendForm(this.form.value as IFormData)
        .pipe(
          finalize(() => {
            this.form.setValue({} as any);
            this.form.markAsUntouched();
            this.modalClose();
          })
        )
        .subscribe();
    }
  }
}
