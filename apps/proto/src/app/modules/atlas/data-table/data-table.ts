/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @angular-eslint/component-selector */
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
import { HlmButtonImports } from '@spartan-ng/helm/button';
import {
  Component,
  signal,
  OnInit,
  DestroyRef,
  inject,
  computed,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { lucideChevronDown } from '@ng-icons/lucide';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import {
  type ColumnFiltersState,
  createAngularTable,
  ExpandedState,
  FlexRenderDirective,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  Table,
  type VisibilityState,
} from '@tanstack/angular-table';

import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HlmPaginationImports } from '@spartan-ng/helm/pagination';
import { dataTableColumns } from './data-table.columns';
import { tableData } from './data-table.data';
import { ChangeDetectionStrategy } from '@angular/core';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

@Component({
  selector: 'atlas-data-table',
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    FlexRenderDirective,
    FormsModule,
    NgIcon,
    RouterOutlet,
    ReactiveFormsModule,
    HlmPaginationImports,
  ],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
      lucideRefreshCcw,
		<div class="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center">
			<input hlmInput class="w-full md:w-80" placeholder="Filter emails..." (input)="_filterChanged($event)" />
  ],
})
export class AtlasDataTableComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  readonly expanded = signal<ExpandedState>({});

  protected readonly data = tableData;

  protected readonly columns = dataTableColumns;

  protected filterChanged(event: Event) {
    this.table()!
      .getColumn('email')
      ?.setFilterValue((event.target as HTMLInputElement).value);
  }

  private readonly columnFilters = signal<ColumnFiltersState>([]);
  private readonly sorting = signal<SortingState>([]);
  private readonly rowSelection = signal<RowSelectionState>({});
  private readonly columnVisibility = signal<VisibilityState>({});

  protected readonly table = signal<Table<Payment>>(
    createAngularTable<Payment>(() => ({
      data: [...this.data, ...this.data],
      columns: this.columns,
      onSortingChange: (updater) => {
        updater instanceof Function
          ? this.sorting.update(updater)
          : this.sorting.set(updater);
      },
      onColumnFiltersChange: (updater) => {
        updater instanceof Function
          ? this.columnFilters.update(updater)
          : this.columnFilters.set(updater);
      },
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: (updater) => {
        updater instanceof Function
          ? this.columnVisibility.update(updater)
          : this.columnVisibility.set(updater);
      },
      onRowSelectionChange: (updater) => {
        updater instanceof Function
          ? this.rowSelection.update(updater)
          : this.rowSelection.set(updater);
      },
      state: {
        sorting: this.sorting(),
        columnFilters: this.columnFilters(),
        columnVisibility: this.columnVisibility(),
        rowSelection: this.rowSelection(),
        pagination: {
          pageIndex: 0,
          pageSize: 5,
        },
      },
    })),
  );

  protected readonly hidableColumns = computed(() => {
    const table = this.table();
    if (table) {
      return table.getAllColumns().filter((column) => column.getCanHide());
    } else {
      return [];
    }
  });

  protected readonly selectedColumn = new FormControl<string[]>([]);

  ngOnInit(): void {
    console.log('getState ', this.table().getState());
    console.log('getPageCount ', this.table().getPageCount());
    console.log('getTotalSize ', this.table().getTotalSize());
    console.log('getPaginationRowModel ', this.table().getPaginationRowModel());
    console.log('getRowModel', this.table().getRowModel());
    console.log('getPageOptions', this.table().getPageOptions());
    this.selectedColumn.setValue(this.hidableColumns().map((a) => a.id));
    this.selectedColumn.valueChanges
      .pipe(
        filter(Boolean),
        tap((values) => {
          this.hidableColumns().forEach((column) =>
            column.toggleVisibility(values.includes(column.id)),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  protected filterChange(email: Event) {
    const target = email.target as HTMLInputElement;
    const typedValue = target.value;
    this.table()!.setGlobalFilter(typedValue);
  }
  readonly rawExpandedState = computed(() =>
    JSON.stringify(this.expanded(), undefined, 2),
  );

  readonly rawRowSelectionState = computed(() =>
    JSON.stringify(this.table().getState().rowSelection, undefined, 2),
  );

  onPageInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const page = inputElement.value ? Number(inputElement.value) - 1 : 0;
    this.table().setPageIndex(page);
  }

  onPageSizeChange(event: any): void {
    this.table().setPageSize(Number(event.target.value));
  }
}
