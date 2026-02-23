/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { RouterOutlet } from '@angular/router';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMaximize,
  lucideMinimize,
  lucideRefreshCcw,
} from '@ng-icons/lucide';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { lucideChevronDown } from '@ng-icons/lucide';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import {
  ColumnDef,
  flexRenderComponent,
  FlexRenderDirective,
} from '@tanstack/angular-table';

import { AtlasDataTableComponent } from '../../atlas/data-table/data-table';
import {
  TableHeadSelection,
  TableRowSelection,
} from '../../atlas/data-table/selection-column';
import { TableHeadSortButton } from '../../atlas/data-table/sort-header-button';
import { ActionDropdown } from '../../atlas/data-table/action-dropdown';
import { AtlasAgGridTable } from '../../atlas/ag-grid-table/ag-grid-table';
import { AtlasColumnGroupingTable } from '../../atlas/column-grouping-table/column-grouping-table';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

@Component({
  selector: 'proto-metadb-entitie-table',
  templateUrl: './metadb-entitie-table.component.html',
  styleUrls: ['./metadb-entitie-table.component.scss'],
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
    AtlasDataTableComponent,
    FlexRenderDirective,
    RouterOutlet,
    AtlasAgGridTable,
    AtlasColumnGroupingTable,
  ],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
      lucideRefreshCcw,
      lucideChevronDown,
    }),
  ],
})
export class MetadbEntitiesComponent {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly data: Payment[] = [
    {
      id: 'm5gr84i9',
      amount: 316,
      status: 'success',
      email: 'ken99@yahoo.com',
    },
    {
      id: '3u1reuv4',
      amount: 242,
      status: 'success',
      email: 'Abe45@gmail.com',
    },
    {
      id: 'derv1ws0',
      amount: 837,
      status: 'processing',
      email: 'Monserrat44@gmail.com',
    },
    {
      id: '5kma53ae',
      amount: 874,
      status: 'success',
      email: 'Silas22@gmail.com',
    },
    {
      id: 'bhqecj4p',
      amount: 721,
      status: 'failed',
      email: 'carmella@hotmail.com',
    },
  ];
  protected readonly columns: ColumnDef<Payment>[] = [
    {
      id: 'select',
      header: () => flexRenderComponent(TableHeadSelection),
      cell: () => flexRenderComponent(TableRowSelection),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'status',
      id: 'status',
      header: 'Status',
      enableSorting: false,
      cell: (info) =>
        `<span class="capitalize">${info.getValue<string>()}</span>`,
    },
    {
      accessorKey: 'email',
      id: 'email',
      header: () =>
        flexRenderComponent(TableHeadSortButton, { inputs: { header: '' } }),
      cell: (info) => `<div class="lowercase">${info.getValue<string>()}</div>`,
    },
    {
      accessorKey: 'amount',
      id: 'amount',
      header: '<div class="text-right">Amount</div>',
      enableSorting: false,
      cell: (info) => {
        const amount = parseFloat(info.getValue<string>());
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);

        return `<div class="text-right">${formatted}</div>`;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: () => flexRenderComponent(ActionDropdown),
    },
  ];
}
