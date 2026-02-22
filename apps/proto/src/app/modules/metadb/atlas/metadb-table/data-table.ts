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
  input,
  computed,
  effect,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { lucideChevronDown } from '@ng-icons/lucide';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import {
  type ColumnDef,
  type ColumnFiltersState,
  createAngularTable,
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
import { data } from '../../../nav/sidebar-header/data';

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
  ],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
      lucideRefreshCcw,
      lucideChevronDown,
    }),
  ],
})
export class AtlasDataTableComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  public readonly data = input<Payment[]>([]);
  public readonly columns = input<ColumnDef<Payment>[]>([]);

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
      data: this.data(),
      columns: this.columns(),
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
}
