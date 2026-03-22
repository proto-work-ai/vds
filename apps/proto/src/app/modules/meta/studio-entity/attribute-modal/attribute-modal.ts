/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  IPaginationResult,
  VirtualScrollPaginateImports,
  injectServiceSearch,
  injectServiceSearchTest,
  markAsSubmit,
} from '@atlas/core';
import { MetaAttribute, MetaEntity } from '@metadb/client';
import { TuiAutoFocus, TuiStringMatcher } from '@taiga-ui/cdk';
import { TuiButton, TuiDataList, TuiError, TuiTextfield, TuiLoader } from '@taiga-ui/core';
import { type TuiDialogContext } from '@taiga-ui/experimental';
import {
  TuiCheckbox,
  TuiTextarea,
  TuiDataListWrapperComponent,
  TuiComboBox,
  TuiFilterByInputPipe,
  TuiFieldErrorPipe,
  TuiChevron,
  TuiDataListWrapper,
  TuiButtonLoading,
  tuiValidationErrorsProvider,
  TuiInputNumber,
} from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';
import { injectContext } from '@taiga-ui/polymorpheus';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, delay, of, startWith, tap } from 'rxjs';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import {
  ATTRIBUTE_MANY_TO_MANY,
  ATTRIBUTE_ONE_TO_MANY,
  ATTRIBUTE_ONE_TO_ONE,
  ATTRIBUTE_TYPE_LIST,
  IAttributeType,
} from '@metadb/core';
import { NgIcon } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { KeyListValuePipe, StringifySetterPipe } from 'apps/proto/src/app/common/pipes/stringify-setter.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PaginationOptions } from '@atlas/core';
import { MetaAttributeService } from '../../services/studio-attribute.service';
import { provideIconAttributeType } from '../../studio-attribute/studio-attribute-type.attribute';
import { MetaEntityService } from '../../services/studio-entity.service';

export interface AttributeEditModalData {
  model: Partial<MetaAttribute>;
}

function attrNameValidator(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const text: string = control.value;
    if (text != null && !text.match(/^[a-z]+[a-z_0-9]*$/i)) {
      return { attributeName: true };
    }
    return null;
  };
}

@Component({
  templateUrl: 'attribute-modal.html',
  styleUrl: 'attribute-modal.scss',
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
    ScrollingModule,
    VirtualScrollPaginateImports,
    StringifySetterPipe,
    TuiLoader,
    AsyncPipe,
    TuiDataListWrapperComponent,
    TuiFilterByInputPipe,
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
  protected readonly metaEntityService = inject(MetaEntityService);
  protected readonly attrTypeList = signal(inject(ATTRIBUTE_TYPE_LIST));

  protected form = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    entityId: new FormControl<string | undefined>(undefined, [Validators.required]),
    title: new FormControl<string | undefined>(undefined, [Validators.required]),
    name: new FormControl<string | undefined>(undefined, [Validators.required, attrNameValidator()]),

    order: new FormControl<number | undefined>(undefined),

    description: new FormControl<string | undefined>(undefined),

    disable: new FormControl(false),
    readonly: new FormControl(false),
    required: new FormControl(false),

    type: new FormControl<string | undefined>(undefined, [Validators.required]),
    relationId: new FormControl<string | undefined>(undefined, [Validators.required]),
    relationName: new FormControl<string | undefined>(undefined),
  });

  protected get isEditable(): boolean {
    return !!this.form.controls.id?.value;
  }

  protected readonly serviceSearch = injectServiceSearch<PaginationOptions, IPaginationResult<MetaEntity>>((params) =>
    this.metaEntityService.getAll(params)
  );
  // protected readonly paginationService = injectServiceSearchTest();

  constructor() {
    this.form.patchValue(this.context.data.model ?? {});

    // Name formatted
    if (!this.isEditable) {
      this.form.controls.title.valueChanges
        .pipe(
          debounceTime(400),
          tap((title) => {
            this.form.controls.name.setValue(this.nameFormatter(title), { emitEvent: false });
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();
    }

    // Name formatted
    this.form.controls.name.valueChanges
      .pipe(
        debounceTime(400),
        tap((name) => {
          this.form.controls.name.setValue(this.nameFormatter(name), { emitEvent: false });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    // Relation
    this.form.controls.type.valueChanges
      .pipe(
        startWith(this.form.controls.type.value),
        tap((type) => {
          switch (type) {
            case ATTRIBUTE_ONE_TO_ONE:
            case ATTRIBUTE_ONE_TO_MANY:
            case ATTRIBUTE_MANY_TO_MANY:
              this.form.controls.relationId.enable();
              break;
            default: {
              this.form.controls.relationId.disable();
            }
          }
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
    this.attributeService
      .create(data)
      .pipe(
        tap(() => this.modalClose(true)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private formUpdate(data: Partial<MetaAttribute>): void {
    this.attributeService
      .update(data)
      .pipe(
        tap(() => this.modalClose(true)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      if (this.isEditable) {
        this.formUpdate(this.form.value as MetaAttribute);
      } else {
        this.formCreate(this.form.value as MetaAttribute);
      }
    }
  }

  protected readonly matcher: TuiStringMatcher<IAttributeType> = (item, query) => {
    return item.title.toLowerCase().includes(query.toLowerCase());
  };
}
