/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */

import { MetaAttribute } from "@metadb/client";
import { ColumnAttributeTable, IMetaAttribute } from "../../../../../../../libs/atlas/core/src/lib/attribute";
import { MetaAttributeType } from "./studio-attribute-type.attribute";

export const attrMetaAttributeId: IMetaAttribute<MetaAttribute> = {
  title: 'Id',
  key: 'id',
  type: 'string'
} as const;

export const attrMetaAttributeName: IMetaAttribute<MetaAttribute> = {
  title: 'Name',
  key: 'name',
  type: 'string'
} as const;

export const attrMetaAttributeTitle: IMetaAttribute<MetaAttribute> = {
  title: 'Title',
  key: 'title',
  type: 'string'
} as const;

export const attrMetaAttributeDisable: IMetaAttribute<MetaAttribute> = {
  title: 'Disable',
  key: 'disable',
  type: 'boolean'
} as const;

export const attrMetaAttributeType: IMetaAttribute<MetaAttribute> = {
  title: 'Type',
  key: 'type',
  type: 'component',
  cellContent: MetaAttributeType,
} satisfies ColumnAttributeTable;


// export const attrMetaAttributeHidden: IMetaAttribute<MetaAttribute> = {
//   title: 'Hidden',
//   key: 'hidden',
//   type: 'boolean'
// } as const;

export const attrMetaAttributeReadonly: IMetaAttribute<MetaAttribute> = {
  title: 'Readonly',
  key: 'readonly',
  type: 'boolean'
} as const;

export const attrMetaAttributeDescription: IMetaAttribute<MetaAttribute> = {
  title: 'Description',
  key: 'description',
  type: 'string'
} as const;

export const attrMetaAttributeUpdatedAt: IMetaAttribute<MetaAttribute> = {
  title: 'Updated At',
  key: 'updatedAt',
  type: 'date'
} as const;

export const attrMetaAttributeCreatedAt: IMetaAttribute<MetaAttribute> = {
  title: 'Created At',
  key: 'createdAt',
  type: 'date'
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
