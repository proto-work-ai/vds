/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, input, output, OnInit, signal, model } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiComparator, TuiSortChange, TuiTable } from '@taiga-ui/addon-table';
import { TuiButton, TuiFormatNumberPipe, TuiTextfield } from '@taiga-ui/core';
import {
  TuiButtonSelect,
  TuiDataListWrapper,
  TuiPagination,
} from '@taiga-ui/kit';
import { TuiContext, TuiStringHandler } from '@taiga-ui/cdk/types';
import { PortalModule } from '@angular/cdk/portal';
import { ColumnAttributeTable } from '@atlas/core';
import { TableCellPortalPipe } from './table-cell-portal';
import { RouterLink } from "@angular/router";
import { TuiDay, tuiDefaultSort, TuiLet } from '@taiga-ui/cdk';
import { BehaviorSubject } from 'rxjs';

/*
  extends PageNumberPagination, PageNumberCounters
*/
export interface ITablePaginate {
  length: number;
  pageCount: number; // size: number;
  currentPage: number;// index: number;
  // length: number;

  totalCount?: number; // total: number;
  items?: number[];
  nextPage?: number | null;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  previousPage?: number | null;
}

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
    AsyncPipe,
    DatePipe,
    RouterLink,
    TuiButton,
    TuiButtonSelect,
    TuiPagination,
    TuiDataListWrapper,
    TuiTable,
    TuiTextfield,
    TuiFormatNumberPipe,
    PortalModule,
    TableCellPortalPipe,
  ],
})
export class AtlasTaigaUiTable<T extends Record<string, unknown>> {
  protected readonly content: TuiStringHandler<TuiContext<number>> = ({ $implicit }) => `${$implicit} items per page`;
  public readonly rows = input.required<T[] | undefined>({ alias: 'tableRows' });
  public readonly columns = input.required<ColumnAttributeTable[]>({ alias: 'tableColumns' });
  public readonly columnKeys = computed(() => this.columns().map(a => a.key));
  public readonly pagination = input<ITablePaginate | undefined>({
    length: 10,
    pageCount: 10,
    currentPage: 4,
    totalCount: 999,
    items: [10, 50, 100],
  }, {
    alias: 'tablePaginate'
  });

  readonly tableRowClick = output<unknown>();

  protected get pageIndex(): number {
    const pagination = this.pagination();
    if (pagination) {
      return pagination.currentPage - 1;
    }
    return 0;
  }

  readonly paginationChange = output<{ currentPage: number, pageCount: number, length: number }>();

  protected readonly totalSorter: TuiComparator<Item> = (a, b) => {
    return tuiDefaultSort(a.price * a.quantity, b.price * b.quantity);
  }

  protected pageIndexChange(indexPage: number): void {
    this.paginationChange.emit({ currentPage: indexPage + 1, pageCount: this.pagination()?.pageCount ?? 0, length: this.pagination()?.length ?? 0 });
  }

  protected pageCountChange(pageCount: number): void {
    this.paginationChange.emit({ currentPage: this.pagination()?.currentPage ?? 0, pageCount, length: this.pagination()?.length ?? 0 });
  }

  protected onTableRowClick(data: unknown): void {
    this.tableRowClick.emit(data);
  }

  public refresh(): void {
    this.paginationChange.emit({
      pageCount: this.pagination()?.pageCount ?? 1,
      currentPage: this.pagination()?.currentPage ?? 0,
      length: this.pagination()?.length ?? 0
    });
  }

  protected readonly columnDirection = model<-1 | 1>(1);
  protected readonly columnSortBy = model<string | number | symbol | null>('order');
  protected sortChange({ sortKey, sortDirection }: TuiSortChange<any>): void {
    this.columnSortBy.set(sortKey);
    this.columnDirection.set(sortDirection);
  }

  protected readonly data = computed(() => {
    const direction = this.columnDirection();
    const sortBy = this.columnSortBy() as string;

    return sortBy
      ? [...this.rows()!].sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];

        if (typeof valA === 'string' && typeof valB === 'string') {
          return valA.localeCompare(valB) * direction;
        }

        if (typeof valA === 'number' && typeof valB === 'number') {
          return (valA - valB) * direction;
        }

        return 0;
      })
      : this.rows();
  });
}
