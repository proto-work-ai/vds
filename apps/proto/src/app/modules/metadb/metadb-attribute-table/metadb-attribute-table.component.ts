/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { RouterOutlet } from '@angular/router';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMaximize,
  lucideMinimize,
  lucideRefreshCcw,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { AtlasDataTableComponent, Payment } from '../atlas/metadb-table/data-table';
import { ColumnDef, flexRenderComponent } from '@tanstack/angular-table';
import { TableHeadSelection, TableRowSelection } from '../atlas/metadb-table/selection-column';
import { TableHeadSortButton } from '../atlas/metadb-table/sort-header-button';
import { ActionDropdown } from '../atlas/metadb-table/action-dropdown';

@Component({
  selector: 'proto-metadb-attributes',
  templateUrl: './metadb-attribute-table.component.html',
  styleUrls: ['./metadb-attribute-table.component.scss'],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
      lucideRefreshCcw,
    }),
  ],
  imports: [
    HlmSidebarImports,
    HlmIconImports,
    HlmButtonImports,
    HlmIconImports,
    RouterOutlet,
    NgIcon,
    AtlasDataTableComponent,
  ],
})
export class MetadbAttributesComponent {
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
