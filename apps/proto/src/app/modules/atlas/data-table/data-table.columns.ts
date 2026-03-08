/* eslint-disable @nx/enforce-module-boundaries */
import { ColumnDef, flexRenderComponent } from '@tanstack/angular-table';
import {
  TableHeadSelection,
  TableRowSelection,
} from './selection-column';
import { TableHeadSortButton } from './sort-header-button';
import { ActionDropdown } from './action-dropdown';
import { Payment } from '../../metadb/entity-table/entity-table.component';

export const dataTableColumns: ColumnDef<Payment>[] = [
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
