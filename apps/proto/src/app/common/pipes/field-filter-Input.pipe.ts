/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-input-rename */
import {
  contentChild,
  DestroyRef,
  Directive,
  effect,
  EmbeddedViewRef,
  inject,
  input,
  NgZone,
  Pipe,
  PipeTransform,
  Renderer2,
  signal,
  TemplateRef,
  untracked,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import {
  TuiTextfieldComponent,
} from '@taiga-ui/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  tap,
  map,
  Observable,
  Subject,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  startWith,
  delay,
  filter,
  of,
  shareReplay,
} from 'rxjs';

export class RenderData {
  model: unknown;
  index?: number;
  elementContainer?: Element;
}

export type ISearchFn<T = unknown> = (text: string, skip: number) => Observable<T[]>;

/*
  Функция оборачивает функцию и кеширует результат функции при одних и тех же аргументах
*/
export function injectServiceSearch<T = unknown[]>(searchFn: ISearchFn) {
  const subject = new Subject<Parameters<ISearchFn>>();
  const share = subject.pipe(
    distinctUntilChanged((prev, cur) => JSON.stringify(prev) === JSON.stringify(cur)),
    switchMap((params) => {
      return searchFn(...params);
    }),
    takeUntilDestroyed(inject(DestroyRef)),
    shareReplay(1)
  );

  return signal((...params: Parameters<ISearchFn<T>>) => {
    subject.next(params);
    return share;
  });
}

// @Pipe({ name: 'fieldFilterByInput', pure: false })
// export class FieldFilterByInput implements PipeTransform {
//   private readonly destroyRef = inject(DestroyRef);
//   private readonly textfield = inject(TuiTextfieldComponent);
//   private readonly skip = signal(0);
//   private readonly filtered = signal<unknown[]>([]);
//   private readonly searchFn = signal<ISearchFn | undefined>(undefined);
//   private readonly textfieldValue$ = new Subject<string>();

//   constructor() {
//     effect(() => this.textfieldValue$.next(this.textfield.value()));
//     this.textfieldValue$
//       .pipe(
//         distinctUntilChanged(),
//         debounceTime(300),
//         switchMap((query) => {
//           if (query) {
//             return this.searchFn()?.(query, this.skip());
//           }
//           return of([]);
//         }),
//         tap((items) => this.filtered.set(items)),
//         takeUntilDestroyed(this.destroyRef)
//       )
//       .subscribe();
//   }

//   transform(items: never, filteringFn: ISearchFn): unknown[] {
//     untracked(() => {
//       if (!this.searchFn()) {
//         this.searchFn.set(filteringFn);
//       }
//     });
//     return this.filtered();
//   }
// }

export function injectRenderTemplate() {
  const zone = inject(NgZone);
  const viewContainerRef = inject(ViewContainerRef);
  const templateRef = inject(TemplateRef<unknown>);
  const renderer = inject(Renderer2);

  function renderTemplate({ index, model, elementContainer }: RenderData): EmbeddedViewRef<unknown> {
    const childView = viewContainerRef.createEmbeddedView(templateRef, {
      index: index ?? 0,
      $implicit: model,
    });
    if (elementContainer) {
      childView.rootNodes.forEach((element) => {
        renderer.appendChild(elementContainer, element);
      });
    }
    return childView;
  }

  return (renderData: RenderData): unknown[] => {
    let childView: EmbeddedViewRef<unknown>;
    if (zone.isStable) {
      childView = zone.run(() => renderTemplate(renderData));
    } else {
      childView = renderTemplate(renderData);
    }

    childView.detectChanges();
    return childView.rootNodes;
  }
}

/*
@Directive({ selector: '[fieldFilterByInput]' })
export class FieldFilterByInputExperimental {
  private readonly destroyRef = inject(DestroyRef);
  private readonly renderTemplateFn = injectRenderTemplate();

  private readonly textfield = contentChild(TuiTextfieldComponent);
  private readonly skip = signal(0);
  private readonly filtered = signal<unknown[]>([]);
  private readonly filteringFn = signal<(Name: string, skip: number) => Observable<unknown[]>>(undefined);
  private readonly filterKeyName = signal<string>(undefined);
  private readonly textfieldQuery$ = new Subject<string>();

  public readonly searchFn = input<ISearchFn>(undefined, { alias: 'fieldFilterByInputOf' });

  constructor() {
    effect(() => {
      const textfield = this.textfield();
      if (textfield) {
        this.textfieldQuery$.next(textfield.value());
      }
    });

    this.textfieldQuery$
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        switchMap((query) => this.filteringFn()?.(query, this.skip()) ?? []),
        startWith([]),
        map((items) => {
          const value = this.textfield()?.control.value;
          if (Array.isArray(value)) {
            const ids: string[] = value.map((a) => a.Id);
            return items.filter((a) => !ids.includes(a.Id));
          } else if (typeof value === 'string' && this.filterKeyName()) {
            const key = this.filterKeyName();
            return items.filter((a) => !!a[key]?.includes(value));
          } else {
            return items;
          }
        }),
        delay(0),
        tap((model) => {
          this.filtered.set(model);
          this.renderTemplateFn({ model });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
*/
