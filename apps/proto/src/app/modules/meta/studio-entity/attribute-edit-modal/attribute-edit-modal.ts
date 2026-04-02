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
  DEFAULT_PAGINATE,
  IPaginationResult,
  KeyListValuePipe,
  StringifySetterPipe,
  VirtualScrollPaginateImports,
  injectServiceSearch,
  markAsSubmit,
} from '@atlas/core';
import { MetaAttribute, MetaEntity } from '@prisma/client';
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
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map, of, startWith, switchMap, tap } from 'rxjs';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import {
  ATTRIBUTE_MANY_TO_MANY,
  ATTRIBUTE_ONE_TO_MANY,
  ATTRIBUTE_ONE_TO_ONE,
  ATTRIBUTE_TYPE_LIST,
  IAttributeType,
  isAttributeRelation,
} from '@metadb/core';
import { NgIcon } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
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
  selector: 'proto-attribute-edit-modal',
  templateUrl: 'attribute-edit-modal.html',
  styleUrl: 'attribute-edit-modal.scss',
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
  protected readonly entityService = inject(MetaEntityService);
  protected readonly attributeService = inject(MetaAttributeService);
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
    relationName: new FormControl<string | undefined>({ value: undefined, disabled: true }, [Validators.required]),

    relationIsUpdated: new FormControl<number | undefined>(undefined),
    relationIsRemoved: new FormControl<number | undefined>(undefined),
  });

  protected get isEditable(): boolean {
    return !!this.context.data.model.id;
  }

  protected readonly entitySearch = injectServiceSearch<IPaginationResult<MetaEntity>>((params) =>
    this.entityService.getAll(params).pipe(
      map((d) => {
        d.data = d.data.filter((a) => a.id != this.context.data.model.entityId);
        return d;
      })
    )
  );

  protected readonly attributeByEntitySearch = toSignal(
    this.form.controls.relationId.valueChanges.pipe(
      switchMap((entityId) => (entityId ? this.attributeService.getByEntity(entityId) : of(DEFAULT_PAGINATE))),
      map(({ data }) => data as MetaAttribute[]),
      // map(({ data }) => data.filter((a: MetaAttribute) => isAttributeRelation(a.type!))),
      tap((data) => {
        console.log('attributes', data);
      }),
      startWith([] as const)
    )
  );

  protected referencedIsUpdated = signal([
    { title: 'No action', value: 1 },
    { title: 'Cascade', value: 2 },
    { title: 'Restrict', value: 3 },
  ] as const);

  protected referencedIsRemoved = signal([
    { title: 'No action', value: 0 },
    { title: 'Cascade', value: 1 },
    { title: 'Restrict', value: 2 },
    { title: 'Set default', value: 3 },
    { title: 'Set NULL', value: 4 },
  ] as const);

  constructor() {
    this.form.patchValue(this.context.data.model ?? {});

    this.form.controls.relationId.valueChanges
      .pipe(
        startWith(this.form.value.relationId),
        distinctUntilChanged(),
        tap((value) => {
          if (value) {
            this.form.controls.relationName.setValue(undefined);
            this.form.controls.relationName.enable();
          } else {
            this.form.controls.relationName.disable();
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

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
              this.form.controls.relationName.enable();
              this.form.controls.relationIsUpdated.enable();
              this.form.controls.relationIsRemoved.enable();
              break;
            default: {
              this.form.controls.relationId.disable();
              this.form.controls.relationName.disable();
              this.form.controls.relationIsUpdated.disable();
              this.form.controls.relationIsRemoved.disable();
            }
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  protected isAttributeRelation(type: string | undefined): boolean {
    return isAttributeRelation(type);
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
    this.entityService
      .create(data)
      .pipe(
        tap(() => this.modalClose(true)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private formUpdate(data: Partial<MetaAttribute>): void {
    this.entityService
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
