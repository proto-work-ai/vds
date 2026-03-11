/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */

import { MetaAttribute } from "@metadb/client";
import { IMetaAttribute } from "../../atlas/core/attribute";

export const attrMetaEntityId: IMetaAttribute<MetaAttribute> = {
  title: 'Id',
  key: 'id',
  type: 'string'
} as const;

export const attrMetaEntityTitle: IMetaAttribute<MetaAttribute> = {
  title: 'Title',
  key: 'title',
  type: 'string'
} as const;

export const attrMetaEntityDescription: IMetaAttribute<MetaAttribute> = {
  title: 'Description',
  key: 'description',
  type: 'string'
} as const;

export const attrMetaEntityDisable: IMetaAttribute<MetaAttribute> = {
  title: 'Disable',
  key: 'disable',
  type: 'boolean'
} as const;

export const attrMetaEntityReadonly: IMetaAttribute<MetaAttribute> = {
  title: 'Readonly',
  key: 'readonly',
  type: 'boolean'
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
