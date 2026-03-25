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
import { map, of, switchMap, tap } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EntityAttributeEditModal, AttributeEditModalData } from '../attribute-modal/attribute-modal';
import { MetaAttribute, MetaEntity } from '@prisma/client';
import { ColumnAttributeTable, injectServiceSearch, PaginationOptions } from '@atlas/core';
import { MetaAttributeService } from '../../services/studio-attribute.service';
import { MetaEntityService } from '../../services/studio-entity.service';
import {
  attrMetaAttributeDescription,
  attrMetaAttributeName, attrMetaAttributeOrder, attrMetaAttributeRequired, attrMetaAttributeTitle,
  attrMetaAttributeType, attrMetaAttributeUpdatedAt
} from '../../studio-attribute/studio-attribute.attributes';
import { AtlasDataTableComponents, AtlasDataTableToggleSize, AtlasTablePaginatePipe, AtlasTaigaUiTable } from '@atlas/table';
import { MetaEntityAttributeService } from '../../services/studio-entity-attribute.service';
import { attributeColumnMenu } from '../../attribute/column-checked.attributes';

@Component({
  selector: 'proto-meta-entity-attributes',
  templateUrl: './entity-attribute-table.component.html',
  styleUrls: ['./entity-attribute-table.component.scss'],
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
    attrMetaAttributeRequired,
    // attrMetaAttributeDisable,
    attrMetaAttributeDescription,
    attrMetaAttributeOrder,
    attrMetaAttributeUpdatedAt,
    // attrMetaAttributeReadonly,
    this.getColumnMenu(),
  ]);

  private readonly tableRef = viewChild(AtlasTaigaUiTable);

  protected readonly serviceSearch = injectServiceSearch((paginate: PaginationOptions) => this.entityAttributeService.getByEntity(this.metaEntityId()!, paginate), false);
  protected readonly tableData = signal<[]>([])//toSignal(this.serviceSearch()().pipe(map(a => a.data)));

  protected readonly tablePaginate = signal<PaginationOptions>({ page: 1, limit: 10, includePageCount: true });
  protected readonly metaEntity = signal<MetaEntity | undefined>(undefined);
  protected readonly metaEntityId = toSignal(this.route.params.pipe(map(({ id }) => id)));

  constructor() {
    toObservable(this.metaEntityId).pipe(
      switchMap((entityId) => {
        if (entityId) {
          return this.entityService.getById(entityId)
        }
        return of(undefined);
      }),
      tap((data) => this.metaEntity.set(data)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  protected openEditModal(model: Partial<MetaAttribute> = {}): void {
    if (!model.id) {
      model.entityId = this.metaEntity()!.id;
      if (model.order == null) {
        model.order = this.tableData()?.length ?? 0;
      }
    }
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
