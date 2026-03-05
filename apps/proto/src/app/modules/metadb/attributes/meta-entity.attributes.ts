/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */

import { IMetaAttribute } from "./meta-checked.attributes";

export const attributeMetaEntityId: IMetaAttribute = {
  title: 'Id',
  key: 'id',
  type: 'string'
} as const;

export const attributeMetaEntityTitle: IMetaAttribute = {
  title: 'Title',
  key: 'title',
  type: 'string'
} as const;

export const attributeMetaEntityDescription: IMetaAttribute = {
  title: 'Description',
  key: 'description',
  type: 'string'
} as const;

export const attributeMetaEntityDisable: IMetaAttribute = {
  title: 'Disable',
  key: 'disable',
  type: 'boolean'
} as const;

export const attributeMetaEntityReadonly: IMetaAttribute = {
  title: 'Readonly',
  key: 'readonly',
  type: 'string'
} as const;

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