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
  lucideEllipsisVertical,
} from '@ng-icons/lucide';
import { Component, ElementRef, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { AtlasTaigaUiTable } from "../../atlas/taiga-ui-table/taiga-ui-table";
import { AtlasDataTableComponents } from '../../atlas/data-table/data-table';
import { AtlasDataTableToggleSize } from '../../atlas/data-table-tools/data-table-toggle-size';
import { AtlasTablePaginatePipe } from '../../atlas/atlas-table-paginate';
import { ComponentType } from '@angular/cdk/portal';

export interface IMetaAttribute {
  title: string | ComponentType<unknown>,
  key: string,
  type: 'number' | 'string' | 'boolean' | 'date' | 'component' | 'template' | 'element';
  width?: string,
  cellTemplate?: ComponentType<unknown> | TemplateRef<unknown> | ElementRef<HTMLElement>
}

@Component({
  selector: 'proto-row-table-menu',
  template: `
    <div class="flex justify-end">
      <button hlmBtn size="icon" variant="outline" class="size-7" align="end" [hlmDropdownMenuTrigger]="menu">
        <ng-icon hlm size="sm" name="lucideEllipsisVertical"></ng-icon>
      </button>
    </div>

		<ng-template #menu>
			<hlm-dropdown-menu class="w-30">
				<!-- <hlm-dropdown-menu-label>My Account</hlm-dropdown-menu-label> -->
				<hlm-dropdown-menu-group>
					<button hlmDropdownMenuItem>
						<span>Profile</span>
						<!-- <hlm-dropdown-menu-shortcut>⇧⌘P</hlm-dropdown-menu-shortcut> -->
					</button>

					<button hlmDropdownMenuItem>
						<span>Billing</span>
						<!-- <hlm-dropdown-menu-shortcut>⌘B</hlm-dropdown-menu-shortcut> -->
					</button>
				</hlm-dropdown-menu-group>
			</hlm-dropdown-menu>
		</ng-template>
    `,
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
    ReactiveFormsModule,
    NgIcon,
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
      lucideEllipsisVertical,
    }),
  ],
})
export class ColumnMenuTable { }

@Component({
  selector: 'proto-row-table-menu',
  template: `
      <label tuiLabel>
        <input tuiCheckbox type="checkbox" size="m" ngModel />
        Readonly
      </label>
    `,
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
    ReactiveFormsModule,
    NgIcon,
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
    }),
  ],
})
export class ColumnCheckedTable { }

@Component({
  selector: 'proto-row-table-menu',
  template: `
      <label tuiLabel>
        <input tuiCheckbox type="checkbox" size="m" ngModel />
        Readonly
      </label>
    `,
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
    ReactiveFormsModule,
    NgIcon,
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
    }),
  ],
})
export class RowCheckedTable { }

export const attributeRowChecked = () => {
  return {
    title: ColumnCheckedTable,
    width: '50px',
    key: 'column-checked-table',
    type: 'component',
    cellTemplate: RowCheckedTable
  } satisfies IMetaAttribute;
}

export const attributeColumnMenu = () => {
  return {
    title: '',
    width: '50px',
    key: 'column-menu-table',
    type: 'component',
    cellTemplate: ColumnMenuTable
  } satisfies IMetaAttribute;
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