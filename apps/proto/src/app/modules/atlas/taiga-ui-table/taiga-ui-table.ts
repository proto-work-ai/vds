/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/component-selector */
import { Component, input, output, OnInit, PipeTransform, DestroyRef, inject, signal, Pipe, untracked, ViewContainerRef, TemplateRef, ElementRef, Injector, InjectionToken } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiButton, TuiFormatNumberPipe, TuiTextfield } from '@taiga-ui/core';
import {
  TuiButtonSelect,
  TuiDataListWrapper,
  TuiPagination,
} from '@taiga-ui/kit';
import { TuiContext, TuiStringHandler } from '@taiga-ui/cdk/types';
import { ComponentPortal, ComponentType, DomPortal, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { IMetaAttribute, MetaAttribute } from '../core/attribute';
import { tableColumnContextProvider, tableRowDataProvider, tableRowProvider } from './table-cell-context';

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

@Pipe({ name: 'componentPortal' })
export class ComponentPortalPipe<T = unknown> implements PipeTransform {
  private readonly injector = inject(Injector);
  private readonly viewContainerRef = inject(ViewContainerRef);

  transform(row: Record<string, unknown>, column: MetaAttribute) {
    switch (column.type) {
      case 'template':
        return new TemplatePortal(column.cellContent as TemplateRef<unknown>, this.viewContainerRef, row, this.createIngector(row, column));
      case 'component':
        return new ComponentPortal(column.cellContent as ComponentType<unknown>, this.viewContainerRef, this.createIngector(row, column));
      case 'element':
        return new DomPortal(column.cellContent as ElementRef<HTMLElement>);
      default:
        return '';
    }
  }

  private createIngector(row: Record<string, unknown>, column: MetaAttribute): Injector {
    return Injector.create({
      parent: this.injector, providers: [
        tableRowProvider(row),
        tableColumnContextProvider(column.cellContentContext),
        tableRowDataProvider(row?.[column.key]),
      ]
    })
  }
}

@Component({
  selector: 'atlas-taiga-ui-table',
  templateUrl: './taiga-ui-table.html',
  styleUrls: ['./taiga-ui-table.scss'],
  imports: [
    FormsModule,
    TuiButton,
    TuiButtonSelect,
    TuiDataListWrapper,
    TuiPagination,
    TuiTable,
    TuiTextfield,
    TuiFormatNumberPipe,
    AsyncPipe,
    PortalModule,
    ComponentPortalPipe,
  ],
})
export class AtlasTaigaUiTable<T extends Record<string, unknown>> implements OnInit {
  protected readonly content: TuiStringHandler<TuiContext<number>> = ({ $implicit }) => `${$implicit} items per page`;
  public readonly rows = input.required<T[] | undefined>({ alias: 'tableRows' });
  public readonly columns = input.required<MetaAttribute[]>({ alias: 'tableColumns' });
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

  protected pageIndexChange(indexPage: number): void {
    this.paginationChange.emit({ currentPage: indexPage + 1, pageCount: this.pagination()?.pageCount ?? 0, length: this.pagination()?.length ?? 0 });
  }

  protected pageCountChange(pageCount: number): void {
    this.paginationChange.emit({ currentPage: this.pagination()?.currentPage ?? 0, pageCount, length: this.pagination()?.length ?? 0 });
  }

  protected onTableRowClick(data: unknown): void {
    this.tableRowClick.emit(data);
  }

  ngOnInit(): void {
    console.log('columns', this.columns());
  }
}

// protected readonly data = [
//   {
//     name: 'Alex Inkin',
//     balance: 1323525,
//   },
//   {
//     name: 'Roman Sedov',
//     balance: 423242,
//   },
// ] as const;