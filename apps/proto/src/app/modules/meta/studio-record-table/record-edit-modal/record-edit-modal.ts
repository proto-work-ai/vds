import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { markAsSubmit } from '@atlas/core';
import { MetaRecord } from '@metadb/client';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { type TuiDialogContext } from '@taiga-ui/experimental';
import { TuiCheckbox, TuiTextarea } from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';
import { injectContext } from '@taiga-ui/polymorpheus';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { MetaRecordService } from '../../services/studio-record.service';
import { HlmButtonImports } from '@spartan-ng/helm/button';

export interface RecordEditModalData {
  model: any;
}

@Component({
  templateUrl: './record-edit-modal.html',
  imports: [HlmButtonImports, FormsModule, ReactiveFormsModule, TuiButton, TuiForm, TuiTextfield, TuiTextarea, TuiCheckbox, TuiAutoFocus],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordEditModal {
  protected readonly context = injectContext<TuiDialogContext<boolean, RecordEditModalData>>();
  protected readonly destroyRef = inject(DestroyRef);
  protected recordService = inject(MetaRecordService);

  protected form = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    title: new FormControl<string | undefined>(undefined, [Validators.required]),
    description: new FormControl<string | undefined>(undefined),
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

  private formCreate(data: Partial<MetaRecord>): void {
    this.recordService.create('', data).pipe(
      tap(() => this.modalClose(true)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  private formUpdate(data: Partial<MetaRecord>): void {
    this.recordService.update(data).pipe(
      tap(() => this.modalClose(true)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      if (this.isEditable) {
        this.formUpdate(this.form.value as MetaRecord)
      } else {
        this.formCreate(this.form.value as MetaRecord)
      }
    }
  }
}
