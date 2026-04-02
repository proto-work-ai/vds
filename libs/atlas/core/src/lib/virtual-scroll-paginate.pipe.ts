/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import {
  contentChild,
  DestroyRef,
  Directive,
  inject,
  Pipe,
  PipeTransform,
  signal,
  untracked,
  WritableSignal,
  effect,
  ElementRef,
  Renderer2,
  Signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter, Observable, skip, Subject, Subscription, switchMap, tap } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { PagePagination, PaginationOptions } from '@atlas/core';
import { ServicePaginateFn } from '@atlas/core';
import { TuiDataListComponent, TuiTextfieldComponent } from '@taiga-ui/core';

/*
  export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    constructor() {
      super(5, 250, 500);
    }
  }
  { provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy },
*/

@Directive({ selector: '[virtualScrollHost]' })
export class VirtualScrollHost {
  private readonly destroyRef = inject(DestroyRef);
  private readonly render = inject(Renderer2);
  private readonly scrollViewport = contentChild(CdkVirtualScrollViewport);
  private readonly elementRef: Signal<ElementRef<HTMLElement> | undefined> = contentChild(TuiDataListComponent, {
    read: ElementRef,
  });
  // private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  readonly scrolledIndex = signal<number | undefined>(undefined);
  protected readonly scrollEventEnd$ = new Subject<void>();
  readonly pageRows = signal<unknown[]>([]);
  readonly pageOptions = signal<PaginationOptions>({ limit: 8, page: 1, includePageCount: true });
  readonly pagePagination = signal<PagePagination | undefined>(undefined);
  readonly pageLoading = signal(false);

  get scrollEventEnd(): Observable<void> {
    return this.scrollEventEnd$.asObservable();
  }

  constructor() {
    let sub: Subscription;
    effect(() => {
      sub?.unsubscribe();
      const scrollViewport = this.scrollViewport()!;
      if (scrollViewport) {
        sub = scrollViewport.scrolledIndexChange
          .pipe(
            tap((index) => {
              this.scrolledIndex.set(index);
              const { end } = scrollViewport.getRenderedRange();
              const total = scrollViewport.getDataLength();
              if (end === total) {
                this.scrollEventEnd$.next();
              }
            }),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe();
      }
    });

    effect(() => this.elementRef()?.nativeElement.classList.add('virtual-scroll-host'));
    effect(() => this.elementRef()?.nativeElement.classList.toggle('loaded', this.pageLoading()));
  }
}

@Pipe({ name: 'virtualScrollPaginate', pure: false })
export class VirtualScrollPaginatePipe<T = any> implements PipeTransform {
  private readonly destroyRef = inject(DestroyRef);
  private readonly viewportHost = inject(VirtualScrollHost, { optional: true })!;

  private readonly serviceFn = signal<ServicePaginateFn<T> | undefined>(undefined);

  private get filtered(): WritableSignal<T[]> {
    return this.viewportHost.pageRows as WritableSignal<T[]>;
  }

  private get pageOptions(): WritableSignal<PaginationOptions> {
    return this.viewportHost?.pageOptions;
  }

  private get pagePagination(): WritableSignal<PagePagination | undefined> {
    return this.viewportHost.pagePagination;
  }

  private get pageLoading(): WritableSignal<boolean> {
    return this.viewportHost.pageLoading;
  }

  private get scrollEventEnd(): Observable<void> {
    return this.viewportHost.scrollEventEnd;
  }

  constructor() {
    if (this.viewportHost) {
      this.scrollEventEnd
        .pipe(
          filter(() => !this.pageLoading()),
          tap(() => this.nextPage()),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();

      toObservable(this.pageOptions)
        .pipe(
          filter(() => !!this.serviceFn()),
          switchMap((options, index) => {
            this.pageLoading.set(true);
            return this.serviceFn()!(options).pipe(
              skip(index && 1),
              tap(() => this.pageLoading.set(false))
            );
          }),
          tap(({ data, paginate }) => {
            this.pagePagination.set(paginate);
            if (paginate.currentPage > 1) {
              this.filtered.update((a) => a.concat(data));
            } else {
              this.filtered.set(data);
            }
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();
    }
  }

  protected paginationChange(options = this.pageOptions?.()): void {
    this.pageOptions?.set(options);
  }

  protected nextPage(): void {
    const options = this.pageOptions();
    const pageCount = this.pagePagination()?.pageCount;
    if (pageCount == null || options.page < pageCount) {
      this.paginationChange({ ...options, page: options.page + 1 });
    }
  }

  transform(items: unknown, filteringFn: ServicePaginateFn<T>): T[] {
    untracked(() => {
      if (!this.serviceFn()) {
        this.serviceFn.set(filteringFn);
        this.paginationChange();
      }
    });
    return this.filtered();
  }
}

export const VirtualScrollPaginateImports = [VirtualScrollHost, VirtualScrollPaginatePipe];
