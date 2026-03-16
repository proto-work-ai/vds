import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { markAsSubmit } from '@atlas/core';
import { MetaAttribute, MetaRecord } from '@metadb/client';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiAlertService, TuiButton, TuiTextfield } from '@taiga-ui/core';
import { type TuiDialogContext } from '@taiga-ui/experimental';
import { TuiForm } from '@taiga-ui/layout';
import { injectContext } from '@taiga-ui/polymorpheus';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { AtlasFormImports } from '@atlas/form';
import { tap } from 'rxjs';
import { MetaRecordService } from '../../services/studio-record.service';

export interface ContentDataEditModalData {
  entityId: string,
  model?: MetaRecord,
  attributes: MetaAttribute[];
}

@Component({
  templateUrl: './data-edit-modal.html',
  imports: [
    HlmButtonImports,
    TuiForm,
    TuiTextfield,
    AtlasFormImports,
    TuiButton,
    TuiAutoFocus,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentDataEditModal {
  protected readonly context = injectContext<TuiDialogContext<boolean, ContentDataEditModalData>>();
  protected readonly destroyRef = inject(DestroyRef);
  protected recordService = inject(MetaRecordService);
  private readonly alerts = inject(TuiAlertService);

  protected form = new FormGroup({
    id: new FormControl<string | undefined>(undefined)
  });

  protected get isEditable(): boolean {
    return !!this.form.controls.id?.value;
  }

  protected get attributes(): MetaAttribute[] {
    return this.context.data.attributes;
  }

  protected get entityId(): string {
    return this.context.data.entityId;
  }

  protected get model(): unknown {
    return this.context.data.model;
  }

  constructor() {
    // this.form.patchValue(this.context.data.model ?? {});
  }

  protected modalClose(result = false): void {
    this.context.completeWith(result);
  }

  private formCreate(data: Partial<MetaRecord>): void {
    this.recordService.create(this.entityId, data).pipe(
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
    } else {
      // this.alerts.open(`It is impossible to show more than alerts concurrently!`,
      //   { label: 'Use power of RxJS!' },
      // ).subscribe();
    }
  }
}
