/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */
import { DestroyRef, inject, signal, InputSignal, PipeTransform, Pipe, untracked } from '@angular/core';
import { BehaviorSubject, filter, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SIGNAL } from '@angular/core/primitives/signals';
import { AtlasTaigaUiTable } from './taiga-ui-table/taiga-ui-table';
import { PaginationOptions, ServicePaginateFn } from '@atlas/core';

function applyValueToInputSignal<T>(signal: InputSignal<T>, value: T) {
  const node = signal[SIGNAL];
  node.applyValueToInputSignal(node, value);
}

@Pipe({ name: 'atlasTablePaginate', pure: false })
export class AtlasTablePaginatePipe<T = Record<string, unknown>> implements PipeTransform {
  private readonly destroyRef = inject(DestroyRef);
  private readonly atlasTable = inject(AtlasTaigaUiTable);
  private readonly tableRows = signal<T[]>([]);
  private readonly paginateFn = signal<ServicePaginateFn<T> | undefined>(undefined);
  protected readonly paginationChange$ = new BehaviorSubject<void>(undefined);
  protected readonly pageOptions = signal<PaginationOptions>({ page: 1, limit: 8, includePageCount: true });

  constructor() {
    this.atlasTable.paginationChange.subscribe((pagination) => this.paginationChange(pagination));

    this.paginationChange$
      .pipe(
        filter(() => !!this.paginateFn()),
        switchMap(() => this.paginateFn()!(this.pageOptions())),
        tap(({ paginate, data }) => {
          applyValueToInputSignal(this.atlasTable.pagination, paginate);
          this.tableRows.set(data);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  protected paginationChange(options = this.pageOptions()) {
    this.pageOptions.set(options);
    this.paginationChange$.next();
  }

  transform(items: unknown, filteringFn: ServicePaginateFn<T>): T[] {
    untracked(() => {
      if (!this.paginateFn()) {
        this.paginateFn.set(filteringFn);
        this.paginationChange();
      }
    });
    return this.tableRows();
  }
}
