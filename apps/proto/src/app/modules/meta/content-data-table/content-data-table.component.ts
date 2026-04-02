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
import { Component, DestroyRef, inject, Injector, Pipe, PipeTransform, signal, viewChild } from '@angular/core';
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
import { AtlasTaigaUiTable } from "@atlas/table";
import { AtlasTablePaginatePipe } from '@atlas/table';
import { ColumnAttributeTable, PaginationOptions } from '@atlas/core';
import { attrMetaEntityDescription, attrMetaEntityDisable, attrMetaEntityReadonly, attrMetaEntityTitle } from '../studio-attribute/studio-entity.attributes';

import { MetaAttribute, MetaEntity, MetaRecord } from '@prisma/client';
import { ActivatedRoute } from '@angular/router';
import { AtlasFormImports, SortByPipe } from '@atlas/form';
import { JsonPipe } from '@angular/common';
import { MetaEntityService } from '../services/studio-entity.service';
import { attributeColumnMenu } from '../attribute/column-checked.attributes';
import { ContentDataEditModal, ContentDataEditModalData } from './data-edit-modal/data-edit-modal';
import { MetaRecordService } from '../services/studio-record.service';
import { PortalModule } from '@angular/cdk/portal';
import { TuiForm } from '@taiga-ui/layout';
import { sortBy } from 'libs/atlas/form/src/lib/pipes/sort-by.pipe';
import { MetaAttributeService } from '../services/studio-attribute.service';

@Pipe({ name: 'metaTableColumns' })
export class MetaTableColumnsPipe implements PipeTransform {
  transform(attributes?: MetaAttribute[]): ColumnAttributeTable[] {
    return attributes?.sort(sortBy<MetaAttribute>('order')).map((item) => {
      return {
        title: item.title!,
        type: item.type!,
        key: item.name,
      } satisfies ColumnAttributeTable
    }) ?? [];
  }
}

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
    JsonPipe,
    MetaTableColumnsPipe,
    PortalModule,
    AtlasFormImports,
    SortByPipe,
    TuiForm,
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
  private readonly injector = inject(Injector);
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogService = inject(TuiDialogService);
  protected readonly recordService = inject(MetaRecordService);
  private readonly route = inject(ActivatedRoute);
  protected readonly entityService = inject(MetaEntityService);
  protected readonly entityAttributeService = inject(MetaAttributeService);
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
  protected readonly tablePaginate = signal<PaginationOptions>({ limit: 10, page: 10, includePageCount: true });

  protected readonly tableRows = signal((paginate: PaginationOptions) =>
    toObservable(this.metaEntityId, { injector: this.injector }).pipe(
      switchMap((entityId) => this.recordService.getByEntity(entityId, paginate))
    )
  );

  protected readonly entityAttributes = toSignal(toObservable(this.metaEntityId).pipe(
    switchMap((entityId) => this.entityAttributeService.getByEntity(entityId)),
    map(({ data }) => data as unknown as MetaAttribute[]),
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
        data: {
          entityId: this.metaEntityId(),
          model,
          attributes: this.entityAttributes()!
        } satisfies ContentDataEditModalData,
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
        onClick: (data: MetaRecord) => this.openEditModal(data)
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
