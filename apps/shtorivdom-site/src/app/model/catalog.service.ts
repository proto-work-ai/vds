import { DestroyRef, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { startWith, tap } from 'rxjs';
import { IAppMenuItem } from '../shared/menu';
import { routePath } from '../app.routes';
import { IContentType } from './products.data';
import { catalogPagesAll } from './catalog/catalog.data';

export function injectCatalog(): Signal<IContentType[]> {
  const catalog = signal<IContentType[]>([]);
  import('./catalog/catalog.data').then(({ catalogPagesAll }) => catalog.set(catalogPagesAll));
  return catalog.asReadonly();
}

// Страница каталога текущего маршрута: из `data` маршрута, иначе по параметру `key`.
export function injectCatalogItemByKey(): WritableSignal<IContentType> {
  const destroyRef = inject(DestroyRef);
  const route = inject(ActivatedRoute);
  const items = injectCatalog();

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
  const base = Array.isArray(patch) ? patch.concat() : [patch];

  return catalogPagesAll.map(({ title, key }) => ({
    title,
    link: base.concat(key),
    queryParams: { key },
    children: [],
  }));
}

export function injectNavMenu(): Signal<IAppMenuItem[]> {
  const navMenu = signal<IAppMenuItem[]>([
    {
      title: 'Каталог',
      children: catalogGroupMenu(['/', routePath.catalog.root]),
    },

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

export function injectFooterMenu(): Signal<IAppMenuItem[]> {
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
