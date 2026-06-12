/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DestroyRef, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { startWith, tap } from 'rxjs';
import { IContentType, productName, stretchCeilingsGroupName } from './products.data';
import { IAppMenuItem } from '../shared/menu';
import { routePath } from '../app.routes';
import { servicePages } from './service-pages';
import { catalogPagesAll } from './catalog.data';

export function injectStretchCeilingsCatalog(): Signal<IContentType[]> {
  const catalog = signal<IContentType[]>([]);
  import('./products.data').then(({ catalogPagesAll: stretchCeilings }) => catalog.set(stretchCeilings));
  return catalog.asReadonly();
}

export function injectStretchCeilingRouteByKey(): WritableSignal<IContentType> {
  const destroyRef = inject(DestroyRef);
  const route = inject(ActivatedRoute);
  const items = injectStretchCeilingsCatalog();

  const item = signal<IContentType | undefined>(undefined);

  if (route.snapshot.data) {
    item.set(route.snapshot.data as IContentType);
  } else {
    effect(() => {
      const list = items();
      if (list.length) {
        route.params
          .pipe(
            startWith(route.snapshot.params),
            tap(({ key }) => {
              const findItem = list.find((a) => a.key === key);
              if (findItem) {
                item.set(findItem);
              }
            }),
            takeUntilDestroyed(destroyRef)
          )
          .subscribe();
      }
    });
  }

  return item as WritableSignal<IContentType>;
}

export function catalogGroupMenu(patch: string | string[] = []): IAppMenuItem[] {
  patch = Array.isArray(patch) ? patch.concat() : [patch];

  const menu = catalogPagesAll.map(({ title, text, key }) => {
    return {
      title: title,
      link: patch.concat(key),
      queryParams: { key },
      children: []
        .map((type) => {
          const item = catalogPagesAll.find((a) => a.types.includes(type))!;
          return [type, item] as const;
        })
        // Если нет в каталоге то не выводим
        .filter(([type, item]) => !!item)
        .map(([type, item]) => {
          return {
            title: productName[type] ?? '',
            link: patch.concat(item.key),
            queryParams: { type },
            fragment: 'main',
          } satisfies IAppMenuItem;
        }),
    } satisfies IAppMenuItem;
  });
  return menu;
}

export function injectNavMenu(patch: string | string[] = []): Signal<IAppMenuItem[]> {
  const navMenu = signal<IAppMenuItem[]>([
    {
      title: 'Каталог',
      // link: ['/', routePath.catalog.root],
      // fragment: 'main',
      children: catalogGroupMenu(['/', routePath.catalog.root]),
    },

    // ...catalogGroupMenu(['/', routePath.catalog.root]),

    // {
    //   title: 'Цены',
    //   link: ['/', routePath.price.root],
    //   fragment: 'main',
    // },

    {
      title: 'Стать партнером',
      link: ['/', routePath.partner.root],
    },

    {
      title: 'О нас',
      link: ['/', routePath.about.root],
    },

    {
      title: 'Контакты',
      link: ['/', routePath.contact.root],
    },
  ]);

  return navMenu.asReadonly();
}

export function injectFooterMenu(patch: string | string[] = []): Signal<IAppMenuItem[]> {
  const navMenu = signal<IAppMenuItem[]>([
    {
      title: 'Стать партнером',
      link: ['/', routePath.partner.root],
    },

    {
      title: 'О нас',
      link: ['/', routePath.about.root],
    },

    {
      title: 'Контакты',
      link: ['/', routePath.contact.root],
    },

    {
      title: 'Каталог',
      children: catalogGroupMenu(['/', routePath.catalog.root]),
    },
  ]);

  return navMenu.asReadonly();
}
