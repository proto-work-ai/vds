export const attributeMetaEntityId = {
    title: 'Id',
    key: 'id',
    type: 'string'
} as const;

export const attributeMetaEntityTitle = {
    title: 'Title',
    key: 'title',
    type: 'string'
} as const;

export const attributeMetaEntityDescription = {
    title: 'Description',
    key: 'description',
    type: 'string'
} as const;

export const attributeMetaEntityDisable = {
    title: 'Disable',
    key: 'disable',
    type: 'boolean'
} as const;

export const attributeMetaEntityReadonly = {
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