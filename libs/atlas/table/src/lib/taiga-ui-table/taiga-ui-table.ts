/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, input, output, model, signal } from '@angular/core';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiComparator, TuiSortChange, TuiTable } from '@taiga-ui/addon-table';
import { TuiButton, TuiFormatNumberPipe, TuiTextfield } from '@taiga-ui/core';
import { TuiButtonSelect, TuiDataListWrapper, TuiPagination } from '@taiga-ui/kit';
import { TuiContext, TuiStringHandler } from '@taiga-ui/cdk/types';
import { PortalModule } from '@angular/cdk/portal';
import { ColumnAttributeTable, PagePagination, PaginationOptions } from '@atlas/core';
import { TableCellPortalPipe } from './table-cell-portal';
import { RouterLink } from '@angular/router';
import { TuiDay, tuiDefaultSort } from '@taiga-ui/cdk';
import { sortBy } from '@atlas/form';

export interface ITableColumn<T extends Record<string, unknown>> {
  title: string;
  key: keyof T;
  type: 'number' | 'string' | 'boolean' | 'date';
}

interface Item {
  readonly date: TuiDay;
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
  readonly unit: string;
}

@Component({
  selector: 'atlas-taiga-ui-table',
  templateUrl: './taiga-ui-table.html',
  styleUrls: ['./taiga-ui-table.scss'],
  imports: [
    FormsModule,
    DatePipe,
    TuiButton,
    TuiButtonSelect,
    TuiPagination,
    TuiDataListWrapper,
    TuiTable,
    TuiTextfield,
    PortalModule,
    TableCellPortalPipe,
    TuiFormatNumberPipe,
    AsyncPipe,
    RouterLink,
    JsonPipe,
  ],
})
export class AtlasTaigaUiTable<T extends Record<string, unknown>> {
  protected readonly content: TuiStringHandler<TuiContext<number>> = ({ $implicit }) => `${$implicit} items per page`;
  public readonly tableRows = input.required<T[] | undefined>({ alias: 'tableRows' });
  public readonly columns = input.required<ColumnAttributeTable[]>({ alias: 'tableColumns' });
  public readonly size = input<'s' | 'm' | 'l'>('l');
  public readonly columnKeys = computed(() => this.columns().map((a) => a.key));

  protected readonly pageOptions = signal<PaginationOptions>({ page: 1, limit: 8, includePageCount: true });

  public readonly pagination = input<PagePagination | undefined>(
    undefined,
    // {
    //   pageCount: 10,
    //   currentPage: 4,
    //   totalCount: 999,
    //   items: [10, 50, 100],
    // },
    {
      alias: 'tablePaginate',
    }
  );

  readonly tableRowClick = output<unknown>();

  protected get pageIndex(): number {
    const pagination = this.pagination();
    if (pagination) {
      return pagination.currentPage - 1;
    }
    return 0;
  }

  readonly paginationChange = output<PaginationOptions>();

  protected readonly totalSorter: TuiComparator<Item> = (a, b) => {
    return tuiDefaultSort(a.price * a.quantity, b.price * b.quantity);
  };

  protected pageIndexChange(indexPage: number): void {
    this.paginationChange.emit({
      page: indexPage + 1,
      limit: this.pagination()?.pageCount ?? 0,
      includePageCount: true,
    });
  }

  protected pageCountChange(limit: number): void {
    this.paginationChange.emit({ page: this.pagination()?.currentPage ?? 0, limit });
  }

  protected onTableRowClick(data: unknown): void {
    this.tableRowClick.emit(data);
  }

  public refresh(): void {
    this.paginationChange.emit({
      limit: this.pagination()?.pageCount ?? 1,
      page: this.pagination()?.currentPage ?? 0,
      includePageCount: true,
    });
  }

  protected readonly columnDirection = model<-1 | 1>(1);
  protected readonly columnSortBy = model<string | number | symbol | null>('order');
  protected sortChange({ sortKey, sortDirection }: TuiSortChange<any>): void {
    this.columnSortBy.set(sortKey);
    this.columnDirection.set(sortDirection);
  }

  protected readonly data = computed(() => {
    const sortKey = this.columnSortBy() as string;
    const direction = this.columnDirection();
    return sortKey ? this.tableRows()?.concat().sort(sortBy(sortKey, direction)) : this.tableRows();
  });
}
