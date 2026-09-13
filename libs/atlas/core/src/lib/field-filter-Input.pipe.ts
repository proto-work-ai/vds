/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-input-rename */
import { DestroyRef, Directive, effect, inject, input, Pipe, PipeTransform, signal, untracked } from '@angular/core';
import { TuiTextfieldComponent } from '@taiga-ui/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap, Subject, switchMap, debounceTime, distinctUntilChanged, filter, of } from 'rxjs';
import { ISearchFn } from './service-search';

@Pipe({ name: 'fieldFilterByInput', pure: false })
export class FieldFilterByInput implements PipeTransform {
  private readonly destroyRef = inject(DestroyRef);
  private readonly textfield = inject(TuiTextfieldComponent);
  private readonly skip = signal(0);
  private readonly filtered = signal<unknown>([]);
  private readonly searchFn = signal<ISearchFn | undefined>(undefined);
  private readonly textfieldValue$ = new Subject<string>();

  constructor() {
    effect(() => this.textfieldValue$.next(this.textfield.value()));
    this.textfieldValue$
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        switchMap((query: string) => {
          if (query) {
            return this.searchFn()?.(query) ?? of([]);
          }
          return of([]);
        }),
        tap((items) => this.filtered.set(items)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  transform(items: never, filteringFn: ISearchFn): unknown {
    untracked(() => {
      if (!this.searchFn()) {
        this.searchFn.set(filteringFn);
      }
    });
    return this.filtered();
  }
}

@Directive({ selector: '[fieldFilterByInput]', exportAs: 'fieldFilter' })
export class FieldFilterByInputDirective {
  private readonly destroyRef = inject(DestroyRef);
  private readonly textfield = inject(TuiTextfieldComponent);
  private readonly filtered = signal<unknown>([]);

  private readonly textfieldQuery$ = new Subject<string>();
  public readonly skip = input<number>(0, { alias: 'fieldFilterByInputSkip' });
  public readonly searchFn = input.required<ISearchFn>({ alias: 'fieldFilterByInput' });

  constructor() {
    effect(() => this.textfieldQuery$.next(this.textfield.value()));
    this.textfieldQuery$
      .pipe(
        filter(Boolean),
        distinctUntilChanged(),
        debounceTime(300),
        switchMap((query) => this.searchFn()?.(query)),
        tap((items) => this.filtered.set(items)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
