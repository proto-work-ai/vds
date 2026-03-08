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
import { tap } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AtlasDataTableComponents } from '../../atlas/data-table/data-table';
import { AtlasDataTableToggleSize } from '../../atlas/data-table-tools/data-table-toggle-size';
import { AtlasTaigaUiTable, ITablePaginate } from "../../atlas/taiga-ui-table/taiga-ui-table";
import { AtlasTablePaginatePipe } from '../../atlas/atlas-table-paginate';
import { attributeColumnMenu } from '../../atlas/attribute/column-checked.attributes';
import { MetaAttribute } from '../../atlas/core/attribute';
import { attributeMetaEntityDescription, attributeMetaEntityDisable, attributeMetaEntityReadonly, attributeMetaEntityTitle } from '../attribute/meta-entity.attributes';
import { MetaEntityService } from '../services/meta-entity.service';

import { MetaEntity } from '@metadb/client';
import { EntityEditModal } from './entity-edit-modal/entity-edit-modal';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

@Component({
  selector: 'proto-metadb-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss'],
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
export class MetadbEntitiesComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogService = inject(TuiDialogService);
  protected readonly entityService = inject(MetaEntityService);
  protected readonly columns = signal<MetaAttribute[]>([
    attributeMetaEntityTitle,
    attributeMetaEntityDescription,
    attributeMetaEntityDisable,
    attributeMetaEntityReadonly,
    this.getColumnMenu(),
  ]);
  private readonly tableRef = viewChild(AtlasTaigaUiTable);

  protected readonly entityServiceAll = signal((paginate: ITablePaginate) =>
    this.entityService.getAll(paginate)
  );

  protected readonly tablePaginate = signal<ITablePaginate>({ currentPage: 1, length: 10, pageCount: 10 });

  protected openEditModal(model?: MetaEntity): void {
    this.dialogService
      .open<string>(new PolymorpheusComponent(EntityEditModal), {
        label: model ? 'Edit Entity' : 'Create Entity',
        size: 'm',
        data: { model },
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
    this.entityService.delete(id).pipe(
      tap(() => this.tableRefresh()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  private getColumnMenu(): MetaAttribute {
    return attributeColumnMenu([
      {
        title: 'Edit Row',
        icon: 'lucidePencil',
        iconClass: 'text-gray-500',
        onClick: (data: MetaEntity) => {
          this.openEditModal(data);
        }
      },
      {
        title: 'Remove Row',
        icon: 'lucideTrash',
        iconClass: 'text-red-500',
        onClick: (data: MetaEntity) => this.removeById(data.id)
      },
    ])
  }

  private tableRefresh(): void {
    this.tableRef()!.refresh();
  }
}
