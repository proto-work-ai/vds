/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideLayersPlus,
  lucideMaximize,
  lucideMinimize,
  lucideRefreshCcw,
  lucideChevronDown,
  lucideTrash,
  lucidePencil,
  lucideChevronLeft,
} from '@ng-icons/lucide';
import { Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { TuiDialogService } from '@taiga-ui/experimental';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { of, switchMap, tap } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AtlasDataTableComponents } from '../../../atlas/data-table/data-table';
import { AtlasTaigaUiTable, ITablePaginate } from '../../../atlas/taiga-ui-table/taiga-ui-table';
import { AtlasDataTableToggleSize } from '../../../atlas/data-table-tools/data-table-toggle-size';
import { AtlasTablePaginatePipe } from '../../../atlas/atlas-table-paginate';
import { MetaAttributeService } from '../../services/studio-attribute.service';
import { MetaEntityService } from '../../services/studio-entity.service';
import { EntityAttributeEditModal, AttributeEditModalData } from '../attribute-edit-modal/attribute-edit-modal';
import { attributeColumnMenu } from '../../../atlas/attribute/column-checked.attributes';
import { MetaAttribute, MetaEntity } from '@metadb/client';
import { ColumnAttributeTable } from '../../../atlas/core/attribute';
import {
  attrMetaAttributeDescription, attrMetaAttributeDisable, 
  attrMetaAttributeName, attrMetaAttributeReadonly, attrMetaAttributeTitle,
  attrMetaAttributeType, attrMetaAttributeUpdatedAt
} from '../../studio-attribute/studio-attribute.attributes';
import { MetaEntityAttributeService } from '../../services/studio-entity-attribute.service';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

@Component({
  selector: 'proto-meta-entity-attributes',
  templateUrl: './attribute-table.component.html',
  styleUrls: ['./attribute-table.component.scss'],
  imports: [
    HlmSidebarImports,
    HlmIconImports,
    HlmButtonImports,
    HlmIconImports,
    HlmDropdownMenuImports,
    HlmButtonImports,
    HlmIconImports,
    HlmInputImports,
    BrnSelectImports,
    HlmSelectImports,
    HlmTableImports,
    FormsModule,
    NgIcon,
    ReactiveFormsModule,
    AtlasDataTableComponents,
    AtlasTaigaUiTable,
    AtlasDataTableToggleSize,
    AtlasTablePaginatePipe,
    RouterModule
  ],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
      lucideRefreshCcw,
      lucideChevronDown,
      lucideLayersPlus,
      lucideTrash,
      lucidePencil,
      lucideChevronLeft,
    }),
  ],
})
export class EntityAttributesComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly alerts = inject(TuiAlertService);
  private readonly route = inject(ActivatedRoute);
  private readonly dialogService = inject(TuiDialogService);
  protected readonly entityService = inject(MetaEntityService);
  protected readonly attributeService = inject(MetaAttributeService);
  protected readonly entityAttributeService = inject(MetaEntityAttributeService);
  protected readonly columns = signal<ColumnAttributeTable[]>([
    attrMetaAttributeTitle,
    attrMetaAttributeName,
    attrMetaAttributeType,
    attrMetaAttributeDisable,
    attrMetaAttributeReadonly,
    attrMetaAttributeDescription,
    attrMetaAttributeUpdatedAt,
    this.getColumnMenu(),
  ]);

  private readonly tableRef = viewChild(AtlasTaigaUiTable);

  protected readonly attributeServiceAll = signal((paginate: ITablePaginate) => {
    if (this.metaEntityId()) {
      return this.attributeService.getByEntity(this.metaEntityId()!);
    } else {
      return this.attributeService.getAll(paginate);
    }
  });

  protected readonly tablePaginate = signal<ITablePaginate>({ currentPage: 1, length: 10, pageCount: 10 });
  protected readonly metaEntityId = signal<string | undefined>(undefined);
  protected readonly metaEntity = signal<MetaEntity | undefined>(undefined);

  constructor() {
    this.route.params.pipe(
      switchMap(({ id }) => {
        this.metaEntityId.set(id);
        if (id) {
          return this.entityService.getById(id)
        }
        return of(undefined);
      }),
      tap((data) => this.metaEntity.set(data)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  protected openEditModal(model: Partial<MetaAttribute> = {}): void {
    model.entityId = this.metaEntity()!.id;
    this.dialogService
      .open<string>(new PolymorpheusComponent(EntityAttributeEditModal), {
        label: model ? 'Edit Attribute' : 'Create Attribute',
        size: 'm',
        data: {
          model
        } satisfies AttributeEditModalData,
      })
      .pipe(
        tap((result) => {
          if (result) {
            this.alerts.open('Alert');
            this.tableRefresh()
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  protected removeById(id: string) {
    this.attributeService.delete(id).pipe(
      tap(() => this.tableRefresh()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  private getColumnMenu(): ColumnAttributeTable {
    return attributeColumnMenu([
      {
        title: 'Edit Row',
        icon: 'lucidePencil',
        iconClass: 'text-gray-500',
        onClick: (data: MetaAttribute) => {
          this.openEditModal(data);
        }
      },
      {
        title: 'Remove Row',
        icon: 'lucideTrash',
        iconClass: 'text-red-500',
        onClick: (data: MetaAttribute) => this.removeById(data.id)
      },
    ])
  }

  private tableRefresh(): void {
    this.tableRef()!.refresh();
  }
}
