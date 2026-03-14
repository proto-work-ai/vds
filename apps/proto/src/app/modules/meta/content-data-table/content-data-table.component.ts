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
} from '@ng-icons/lucide';
import { Component, computed, DestroyRef, inject, Signal, signal, viewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { TuiDialogService } from '@taiga-ui/experimental';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { map, of, startWith, switchMap, tap } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AtlasDataTableComponents } from '@atlas/table';
import { AtlasDataTableToggleSize } from '@atlas/table';
import { AtlasTaigaUiTable, ITablePaginate } from "@atlas/table";
import { AtlasTablePaginatePipe } from '@atlas/table';
import { ColumnAttributeTable } from '@atlas/core';
import { attrMetaEntityDescription, attrMetaEntityDisable, attrMetaEntityReadonly, attrMetaEntityTitle } from '../studio-attribute/studio-entity.attributes';

import { MetaEntity, MetaRecord } from '@metadb/client';
import { ContentDataEditModal, ContentDataEditModalData } from './data-edit-modal/data-edit-modal';
import { MetaRecordService } from '../services/studio-record.service';
import { ActivatedRoute } from '@angular/router';
import { MetaEntityService } from '../services/studio-entity.service';
import { MetaEntityAttributeService } from '../services/studio-entity-attribute.service';
import { attributeColumnMenu } from '../attribute/column-checked.attributes';

@Component({
  selector: 'proto-content-data-table',
  templateUrl: './content-data-table.component.html',
  styleUrls: ['./content-data-table.component.scss'],
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
    AtlasDataTableComponents,
    FormsModule,
    NgIcon,
    ReactiveFormsModule,
    AtlasTaigaUiTable,
    AtlasDataTableToggleSize,
    AtlasTablePaginatePipe,
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
    }),
  ],
})
export class ContentDataTableComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogService = inject(TuiDialogService);
  protected readonly recordService = inject(MetaRecordService);
  private readonly route = inject(ActivatedRoute);
  protected readonly entityService = inject(MetaEntityService);
  protected readonly entityAttributeService = inject(MetaEntityAttributeService);
  protected readonly columns = signal<any[]>([
    attrMetaEntityTitle,
    attrMetaEntityDescription,
    attrMetaEntityDisable,
    attrMetaEntityReadonly,
    this.getColumnMenu(),
  ]);
  private readonly tableRef = viewChild(AtlasTaigaUiTable);
  protected readonly metaEntity = signal<MetaEntity | undefined>(undefined);
  protected readonly metaEntityId = toSignal(this.route.params.pipe(map(({ entityId }) => entityId)));
  protected readonly recordServiceAll = signal((paginate: ITablePaginate) =>
    this.recordService.getAll(paginate)
  );

  protected readonly tablePaginate = signal<ITablePaginate>({ currentPage: 1, length: 10, pageCount: 10 });

  protected readonly entityColums = toSignal(toObservable(this.metaEntityId).pipe(
    switchMap((entityId) => this.entityAttributeService.getByEntity(entityId)),
    map(({ data }) => {
      return data.map((item) => {
        return {
          title: item.title!,
          type: item.type!,
          key: item.name,
        } satisfies ColumnAttributeTable
      });
    }),
    tap((data) =>{      
      console.log('entityColums', data);
    }),
    startWith([]),
  ));

  constructor() {
    toObservable(this.metaEntityId).pipe(
      switchMap((entityId) => {
        if (entityId) {
          return this.entityService.getById(entityId);
        }
        return of(undefined);
      }),
      tap((data) => this.metaEntity.set(data)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  protected openEditModal(model?: MetaRecord): void {
    this.dialogService
      .open<string>(new PolymorpheusComponent(ContentDataEditModal), {
        label: model ? 'Edit Record' : 'Create Record',
        size: 'm',
        data: { model } satisfies ContentDataEditModalData,
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
    this.recordService.delete(id).pipe(
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
        onClick: (data: MetaRecord) => {
          this.openEditModal(data);
        }
      },
      {
        title: 'Remove Row',
        icon: 'lucideTrash',
        iconClass: 'text-red-500',
        onClick: (data: MetaRecord) => this.removeById(data.id)
      },
    ])
  }

  private tableRefresh(): void {
    this.tableRef()!.refresh();
  }
}
