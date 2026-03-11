/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */
import { DestroyRef, Directive, inject, signal, OnInit, input, effect, InputSignal, PipeTransform, Pipe, untracked } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SIGNAL } from '@angular/core/primitives/signals';
import { AtlasTaigaUiTable, ITablePaginate } from './taiga-ui-table/taiga-ui-table';
import { IMetaEntityData } from '../meta/services/meta-entity.service';

function applyValueToInputSignal<T>(signal: InputSignal<T>, value: T) {
  const node = signal[SIGNAL];
  node.applyValueToInputSignal(node, value);
}

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export type ServicePaginateFn<T = unknown> = (paginate: ITablePaginate) => Observable<IMetaEntityData<T>>;

@Directive({
  selector: '[atlasTablePaginate]',
})
export class AtlasTablePaginate implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private atlasTable = inject(AtlasTaigaUiTable);
  protected readonly tableChange$ = new BehaviorSubject<void>(undefined);
  protected readonly tablePaginate = signal<ITablePaginate>({ currentPage: 1, length: 8, pageCount: 1 });
  readonly servicePaginate = input.required<ServicePaginateFn>({ alias: 'atlasTablePaginate' });

  constructor() {
    effect(() => {
      if (this.tablePaginate()) {
        applyValueToInputSignal(this.atlasTable.pagination, this.tablePaginate());
      }
    });
  }

  ngOnInit(): void {
    this.atlasTable.paginationChange.subscribe((params: { currentPage: number; pageCount: number; length: number; }) => this.paginationChange(params));

    this.tableChange$.pipe(
      switchMap(() => this.servicePaginate()(this.tablePaginate())),
      tap(({ paginate }) => this.tablePaginate.set({ ...this.tablePaginate(), ...paginate })),
      map(({ data }) => data),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }


  protected paginationChange(params: { currentPage: number; pageCount: number; length: number; }) {
    this.tablePaginate.set(params);
    this.tableChange$.next();
  }
}

@Pipe({ name: 'atlasTablePaginate', pure: false })
export class AtlasTablePaginatePipe<T = any> implements PipeTransform {
  private readonly destroyRef = inject(DestroyRef);
  private atlasTable = inject(AtlasTaigaUiTable);
  private readonly tableRows = signal<T[]>([]);
  private readonly paginateFn = signal<ServicePaginateFn<T> | undefined>(undefined);
  protected readonly paginationChange$ = new BehaviorSubject<void>(undefined);
  protected readonly tablePaginate = signal<ITablePaginate>({ currentPage: 1, length: 8, pageCount: 1 });

  constructor() {
    effect(() => {
      if (this.tablePaginate()) {
        applyValueToInputSignal(this.atlasTable.pagination, this.tablePaginate());
      }
    });

    this.atlasTable.paginationChange.subscribe((pagination) => this.paginationChange(pagination));

    this.paginationChange$.pipe(
      filter(() => !!this.paginateFn()),
      switchMap(() => {
        return this.paginateFn()!(this.tablePaginate());
      }),
      tap(({ paginate }) => this.tablePaginate.set({ ...this.tablePaginate(), ...paginate })),
      map(({ data }) => this.tableRows.set(data)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  protected paginationChange(params: { currentPage: number; pageCount: number; length: number; } = this.tablePaginate()) {
    this.tablePaginate.set(params);
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
