/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */
import { AtlasColumnTableMenu } from './column-table-menu';
import { ColumnAllCheckedTable } from './columnn-all-table-checked';
import { ColumnTableChecked } from './column-table-checked';
import { ColumnAttributeTable } from '../core/attribute';
import { IMenuItem } from '@atlas/core';

export const attributeRowChecked = () => {
  return {
    title: ColumnAllCheckedTable,
    width: '50px',
    key: 'column-checked-table',
    type: 'component',
    cellContent: ColumnTableChecked
  } satisfies ColumnAttributeTable;
}

export const attributeColumnMenu = (context: IMenuItem[]) => {
  return {
    title: '',
    width: '50px',
    key: 'column-menu-table',
    type: 'component',
    cellContent: AtlasColumnTableMenu,
    cellContentContext: context
  } satisfies ColumnAttributeTable;
}

/*
  protected readonly columns3: ColumnDef<Payment>[] = [
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
*/