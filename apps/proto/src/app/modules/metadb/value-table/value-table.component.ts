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

import { MetaValue } from '@metadb/client';
import { ValueEditModal, ValueEditModalData } from './value-edit-modal/value-edit-modal';
import { MetaValueService } from '../services/meta-value.service';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

@Component({
  selector: 'proto-metadb-values',
  templateUrl: './value-table.component.html',
  styleUrls: ['./value-table.component.scss'],
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
export class MetadbValuesComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogService = inject(TuiDialogService);
  protected readonly valueService = inject(MetaValueService);
  protected readonly columns = signal<MetaAttribute[]>([
    attributeMetaEntityTitle,
    attributeMetaEntityDescription,
    attributeMetaEntityDisable,
    attributeMetaEntityReadonly,
    this.getColumnMenu(),
  ]);
  private readonly tableRef = viewChild(AtlasTaigaUiTable);

  protected readonly entityServiceAll = signal((paginate: ITablePaginate) =>
    this.valueService.getAll(paginate)
  );

  protected readonly tablePaginate = signal<ITablePaginate>({ currentPage: 1, length: 10, pageCount: 10 });

  protected openEditModal(model?: MetaValue): void {
    this.dialogService
      .open<string>(new PolymorpheusComponent(ValueEditModal), {
        label: model ? 'Edit Value' : 'Create Value',
        size: 'm',
        data: { model } satisfies ValueEditModalData,
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

  protected removeBy(data: MetaValue) {
    this.valueService.delete(data).pipe(
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
        onClick: (data: MetaValue) => {
          this.openEditModal(data);
        }
      },
      {
        title: 'Remove Row',
        icon: 'lucideTrash',
        iconClass: 'text-red-500',
        onClick: (data: MetaValue) => this.removeBy(data)
      },
    ])
  }

  private tableRefresh(): void {
    this.tableRef()!.refresh();
  }
}
