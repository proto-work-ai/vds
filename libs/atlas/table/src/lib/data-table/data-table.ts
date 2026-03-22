/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  OnInit,
  inject,
  DestroyRef,
  Directive,
  computed,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import {
  type ColumnDef,
  type ColumnFiltersState,
  createAngularTable,
  flexRenderComponent,
  FlexRenderDirective,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/angular-table';
import { ActionDropdown } from './action-dropdown';
import { TableHeadSelection, TableRowSelection } from './selection-column';
import { TableHeadSortButton } from './sort-header-button';
import { makeData, Person } from './makeData';
import { contentChild } from '@angular/core';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[dataTableHeader], [data-taable-header]',
  standalone: true,
})
export class DataTableHeader {}

/*
  <atlas-data-table>
    <header *dataTableHeader class="flex gap-2 flex-1">

      <button variant="outline" hlmBtn (click)="openEditModal()">Create Entity</button>

      <atlas-data-table-filter [columnName]="'email'"></atlas-data-table-filter>

      <div class="flex-1"></div>

      <atlas-data-table-column-select></atlas-data-table-column-select>

      <button hlmBtn size="icon" variant="outline">
        <ng-icon hlm size="sm" name="lucideRefreshCcw"></ng-icon>
      </button>

      <atlas-data-table-toggle-size></atlas-data-table-toggle-size>
    </header>
  </atlas-data-table>
*/
@Component({
  selector: 'atlas-data-table',
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIcon,
    FlexRenderDirective,
    FormsModule,
    HlmDropdownMenuImports,
    HlmButtonImports,
    HlmIconImports,
    HlmInputImports,
    BrnSelectImports,
    HlmSelectImports,
    HlmTableImports,
    ReactiveFormsModule,
    PortalModule,
  ],
  providers: [provideIcons({ lucideChevronDown })],
  host: {
    class: 'w-full',
  },
})
export class AtlasDataTableComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly headerTemplate = contentChild(DataTableHeader, {
    read: TemplateRef,
  });
  private readonly viewContainerRef = inject(ViewContainerRef);

  protected readonly tableHeaderPortal = computed(() => {
    const header = this.headerTemplate();
    return header
      ? new TemplatePortal(header, this.viewContainerRef)
      : undefined;
  });

  // protected readonly selectedColumn = new FormControl<string[]>([]);
  protected filterChanged(event: Event) {
    this.table
      .getColumn('email')
      ?.setFilterValue((event.target as HTMLInputElement).value);
  }

  protected readonly columns: ColumnDef<Person>[] = [
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
      id: 'firstName',
      header: () =>
        flexRenderComponent(TableHeadSortButton, { inputs: { header: '' } }),
      accessorKey: 'firstName',
      cell: (info) => `<div class="lowercase">${info.getValue<string>()}</div>`,
    },
    {
      accessorKey: 'age',
      id: 'age',
      header: '<div class="text-right">Amount</div>',
      enableSorting: false,
      cell: (info) => {
        const age = parseFloat(info.getValue<string>());
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(age);

        return `<div class="text-right">${formatted}</div>`;
      },
    },
    {
      header: () => 'Visits',
      accessorKey: 'visits',
      footer: (props) => props.column.id,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      footer: (props) => props.column.id,
    },
    {
      header: 'Profile Progress',
      accessorKey: 'progress',
      footer: (props) => props.column.id,
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: () => flexRenderComponent(ActionDropdown),
    },
  ];

  private readonly _columnFilters = signal<ColumnFiltersState>([]);
  private readonly _sorting = signal<SortingState>([]);
  private readonly _rowSelection = signal<RowSelectionState>({});
  private readonly _columnVisibility = signal<VisibilityState>({});

  data = signal<Person[]>(makeData(10_000));

  public readonly table = createAngularTable<Person>(() => ({
    data: this.data(),
    columns: this.columns,
    onSortingChange: (updater) => {
      updater instanceof Function
        ? this._sorting.update(updater)
        : this._sorting.set(updater);
    },
    onColumnFiltersChange: (updater) => {
      updater instanceof Function
        ? this._columnFilters.update(updater)
        : this._columnFilters.set(updater);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: (updater) => {
      updater instanceof Function
        ? this._columnVisibility.update(updater)
        : this._columnVisibility.set(updater);
    },
    onRowSelectionChange: (updater) => {
      updater instanceof Function
        ? this._rowSelection.update(updater)
        : this._rowSelection.set(updater);
    },
    state: {
      sorting: this._sorting(),
      columnFilters: this._columnFilters(),
      columnVisibility: this._columnVisibility(),
      rowSelection: this._rowSelection(),
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  }));

  // protected readonly hidableColumns = this.table
  //   .getAllColumns()
  //   .filter((column) => column.getCanHide());

  protected _filterChange(email: Event) {
    const target = email.target as HTMLInputElement;
    const typedValue = target.value;
    this.table.setGlobalFilter(typedValue);
  }

  ngOnInit(): void {
    console.log('getState ', this.table().getState());
    console.log('getPageCount ', this.table().getPageCount());
    console.log('getTotalSize ', this.table().getTotalSize());
    console.log('getPaginationRowModel ', this.table().getPaginationRowModel());
    console.log('getRowModel', this.table().getRowModel());
    //console.log('getPageOptions', this.table().getPageOptions());

    // this.selectedColumn.setValue(this.hidableColumns.map((a) => a.id));
    // this.selectedColumn.valueChanges
    //   .pipe(
    //     filter(Boolean),
    //     tap((values) => {
    //       this.hidableColumns.forEach((column) =>
    //         column.toggleVisibility(values.includes(column.id)),
    //       );
    //     }),
    //     takeUntilDestroyed(this.destroyRef),
    //   )
    //   .subscribe();
  }

  refreshData(): void {
    this.data.set(makeData(10_000));
  }
}

export const AtlasDataTableComponents = [
  AtlasDataTableComponent,
  DataTableHeader,
];
