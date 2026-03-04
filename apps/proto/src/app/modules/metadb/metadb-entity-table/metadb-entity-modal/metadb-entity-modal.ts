import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormType, markAsSubmit } from '@atlas/core';
import { MetaEntity } from '@metadb/client';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { type TuiDialogContext } from '@taiga-ui/experimental';
import { TuiCheckbox, TuiTextarea } from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';
import { injectContext } from '@taiga-ui/polymorpheus';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MetaDbEntityService } from '../../services/metadb-entity.service';
import { tap } from 'rxjs';

export interface MetaEntityModalData {
  model: Partial<any>;
}

@Component({
  templateUrl: './metadb-entity-modal.html',
  imports: [FormsModule, ReactiveFormsModule, TuiButton, TuiForm, TuiTextfield, TuiTextarea, TuiCheckbox, TuiAutoFocus],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaEntityModal {
  protected readonly context = injectContext<TuiDialogContext<boolean, MetaEntityModalData>>();
  protected destroyRef = inject(DestroyRef);
  protected entityService = inject(MetaDbEntityService);

  protected form = new FormGroup<FormType<MetaEntity>>({
    id: new FormControl<string>(''),
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    // name: new FormControl(undefined, [Validators.required]),
    disable: new FormControl(false),
    readonly: new FormControl(false),
  });

  protected get isEditable(): boolean {
    return !!this.form.controls.id?.value;
  }

  constructor() {
    this.form.patchValue(this.context.data.model ?? {});
  }

  protected modalClose(result = false): void {
    this.context.completeWith(result);
  }

  private formCreate(data: Partial<MetaEntity>): void {
    this.entityService.create(data).pipe(
      tap(() => this.modalClose(true)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  private formUpdate(data: Partial<MetaEntity>): void {
    this.entityService.update(data).pipe(
      tap(() => this.modalClose(true)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      if (this.isEditable) {
        this.formUpdate(this.form.value)
      } else {
        this.formCreate(this.form.value)
      }
    }
  }
}
