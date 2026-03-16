/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { markAsSubmit } from '@atlas/core';
import { MetaAttribute } from '@metadb/client';
import { TuiAutoFocus, TuiStringMatcher } from '@taiga-ui/cdk';
import { TuiButton, TuiDataList, TuiError, TuiTextfield } from '@taiga-ui/core';
import { type TuiDialogContext } from '@taiga-ui/experimental';
import { TuiCheckbox, TuiTextarea, TuiDataListWrapperComponent, TuiComboBox, TuiFilterByInputPipe, TuiFieldErrorPipe, TuiChevron, TuiDataListWrapper, TuiButtonLoading, tuiValidationErrorsProvider, TuiInputNumber } from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';
import { injectContext } from '@taiga-ui/polymorpheus';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { ATTRIBUTE_TYPE_LIST, IAttributeType } from '@metadb/core';
import { MetaAttributeService } from '../../services/studio-attribute.service';
import { NgIcon } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { KeyListValuePipe, StringifySetterPipe } from 'apps/proto/src/app/common/pipes/stringify-setter.pipe';
import { provideIconAttributeType } from '../../studio-attribute/studio-attribute-type.attribute';

export interface AttributeEditModalData {
  model: Partial<MetaAttribute>;
}

function attNameValidator(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const text: string = control.value;
    if (text != null && !text.match(/^[a-z]+[a-z_0-9]*$/i)) {
      return { attributeName: true };
    }
    return null;
  }
}

@Component({
  templateUrl: 'attribute-modal.html',
  imports: [
    HlmButtonImports,
    FormsModule,
    ReactiveFormsModule,
    TuiForm,
    TuiTextfield,
    TuiTextarea,
    TuiCheckbox,
    ReactiveFormsModule,
    TuiTextfield,
    TuiTextarea,
    TuiDataList,
    TuiChevron,
    TuiComboBox,
    TuiDataListWrapper,
    AsyncPipe,
    NgIcon,
    HlmIcon,
    TuiError,
    TuiFieldErrorPipe,
    KeyListValuePipe,
    TuiInputNumber,
    TuiDataListWrapperComponent,
    TuiFilterByInputPipe,
    StringifySetterPipe,
    JsonPipe,
    TuiButton,
    TuiButtonLoading,
    TuiAutoFocus,
  ],
  providers: [
    provideIconAttributeType(),
    tuiValidationErrorsProvider({
      required: 'Поле обязательно для заполнения',
      attributeName: 'Неверный формат',
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityAttributeEditModal {
  protected readonly context = injectContext<TuiDialogContext<boolean, AttributeEditModalData>>();
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly attributeService = inject(MetaAttributeService);
  protected readonly attrTypeList = signal(inject(ATTRIBUTE_TYPE_LIST));

  protected form = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    entityId: new FormControl<string | undefined>(undefined, [Validators.required]),

    title: new FormControl<string | undefined>(undefined, [Validators.required]),
    name: new FormControl<string | undefined>(undefined, [Validators.required, attNameValidator()]),

    type: new FormControl<string | undefined>(undefined, [Validators.required]),

    order: new FormControl<number | undefined>(undefined),
    
    description: new FormControl<string | undefined>(undefined),

    disable: new FormControl(false),
    readonly: new FormControl(false),
    required: new FormControl(false),
  });

  protected get isEditable(): boolean {
    return !!this.form.controls.id?.value;
  }

  constructor() {
    this.form.patchValue(this.context.data.model ?? {});

    this.form.controls.title.valueChanges
      .pipe(
        debounceTime(400),
        tap((title) => {
          this.form.controls.name.setValue(this.nameFormatter(title), { emitEvent: false });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    this.form.controls.name.valueChanges
      .pipe(
        debounceTime(400),
        tap((name) => {
          this.form.controls.name.setValue(this.nameFormatter(name), { emitEvent: false });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private nameFormatter(title?: string | null): string | undefined {
    if (title) {
      return title.replace(/\s/m, '_').toLocaleLowerCase();
    } else {
      return undefined;
    }
  }

  protected modalClose(result = false): void {
    this.context.completeWith(result);
  }

  private formCreate(data: Partial<MetaAttribute>): void {
    this.attributeService.create(data).pipe(
      tap(() => this.modalClose(true)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  private formUpdate(data: Partial<MetaAttribute>): void {
    this.attributeService.update(data).pipe(
      tap(() => this.modalClose(true)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      if (this.isEditable) {
        this.formUpdate(this.form.value as MetaAttribute)
      } else {
        this.formCreate(this.form.value as MetaAttribute)
      }
    }
  }

  protected readonly matcher: TuiStringMatcher<IAttributeType> = (item, query) => {
    return (
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  };
}
