/* eslint-disable @nx/enforce-module-boundaries */
import { ISearchFn } from '@atlas/core';

export type PaginationOptions  = {
  limit: number;
  page: number;
  includePageCount?: boolean;
}

/*
  extends PageNumberPagination, PageNumberCounters
*/
export type PagePagination  = {
  currentPage: number; // текущая страница;
  pageCount: number; // количество страниц
  totalCount?: number; // общее количество результатов

  items?: number[]; // paje size [10, 20, 30]
  nextPage?: number | null;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  previousPage?: number | null;
}

export type ServicePaginateFn<T> = ISearchFn<PaginationOptions, IPaginationResult<T>>;

export interface IPaginationResult<T = unknown> {
  data: T[];
  paginate: PagePagination;
}
