/* eslint-disable @nx/enforce-module-boundaries */
import { DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, switchMap, distinctUntilChanged, shareReplay, tap, of, delay } from 'rxjs';
import { IPaginationResult, PaginationOptions } from './service-pagination';

export type ISearchFn<P = unknown, R = unknown> = (params: P) => Observable<R>;

/*
  Функция оборачивает функцию и кеширует результат при одних и тех же аргументах
*/
export function injectServiceSearch<R = unknown, P = PaginationOptions>(searchFn: ISearchFn<P, R>, caches = true) {
  const subject = new Subject<P>();
  const share = subject.pipe(
    distinctUntilChanged((prev, cur) => (caches ? JSON.stringify(prev) === JSON.stringify(cur) : false)),
    switchMap((params) => searchFn(params)),
    shareReplay(1),
    takeUntilDestroyed(inject(DestroyRef))
  );

  return signal((params: P) => {
    if (params != null) {
      queueMicrotask(() => subject.next(params));
    }
    return share;
  });
}

export function injectServiceSearchTest() {
  return injectServiceSearch<any>((options) => {
    const { limit, page } = options;
    return of({
      data: Array.from({ length: limit }).map((_, i) => `Item #${limit * (page! - 1)! + i}`),
      paginate: { currentPage: page!, pageCount: 4 },
    } satisfies IPaginationResult<any>).pipe(delay(1000));
  });
}
