/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DestroyRef, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { startWith, tap } from 'rxjs';
import {
  IContentType,
  stretchCeilingAll,
  stretchCeilingGroupMap,
  productTypeName,
  stretchCeilingsGroupName,
} from './stretch-ceiling';
import { IAppMenuItem } from '../shared/menu';
import { routePath } from '../app.routes';
import { servicePages } from './service-pages';

export function injectStretchCeilingsCatalog(): Signal<IContentType[]> {
  const catalog = signal<IContentType[]>([]);
  import('./stretch-ceiling').then(({ stretchCeilingAll: stretchCeilings }) => catalog.set(stretchCeilings));
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

export function injectStretchCeilingGroupMenu(patch: string | string[] = []): IAppMenuItem[] {
  patch = Array.isArray(patch) ? patch.concat() : [patch];
  const menu = Array.from(stretchCeilingGroupMap, ([group, values]) => {
    return {
      title: stretchCeilingsGroupName[group],
      queryParams: { group },
      children: values
        .map((type) => {
          const item = stretchCeilingAll.find((a) => a.types.includes(type))!;
          return [type, item] as const;
        })
        // Если нет в каталоге то не выводим
        .filter(([type, item]) => !!item)
        .map(([type, item]) => {
          return {
            title: productTypeName[type] ?? '',
            link: patch.concat(item.key),
            queryParams: { type },
            fragment: 'main',
          } satisfies IAppMenuItem;
        }),
    } satisfies IAppMenuItem;
  });
  return menu;
}

const menuServices: IAppMenuItem = {
  title: 'Услуги',
  fragment: 'main',
  children: servicePages.map(({ title, key }) => {
    return {
      title,
      link: ['/', routePath.services.root, key],
      fragment: 'main',
    };
  }),
};

export function injectNavMenu(patch: string | string[] = []): Signal<IAppMenuItem[]> {
  const navMenu = signal<IAppMenuItem[]>([
    {
      title: 'Каталог',
      // link: ['/', routePath.catalog.root],
      fragment: 'main',
      children: injectStretchCeilingGroupMenu(['/', routePath.catalog.root]),
    },

    // ...injectStretchCeilingGroupMenu(['/', routePath.catalog.root]),

    menuServices,

    {
      title: 'Калькулятор',
      link: ['/', routePath.calculator.root],
      fragment: 'main',
    },

    {
      title: 'Цены',
      link: ['/', routePath.price.root],
      fragment: 'main',
    },
    // {
    //   title: 'Контакты',
    //   link: ['/', routePath.contacts.root],
    // },
  ]);

  return navMenu.asReadonly();
}

export function injectFooterMenu(patch: string | string[] = []): Signal<IAppMenuItem[]> {
  const navMenu = signal<IAppMenuItem[]>([
    {
      title: 'Каталог',
      link: ['/', routePath.catalog.root],
      fragment: 'main',
    },

    menuServices,
    
    {
      title: 'Калькулятор',
      link: ['/', routePath.calculator.root],
      fragment: 'main',
    },

    {
      title: 'Цены',
      link: ['/', routePath.price.root],
      fragment: 'main',
    },
    // {
    //   title: 'Контакты',
    //   link: ['/', 'contacts'],
    // },

    ...injectStretchCeilingGroupMenu(['/', 'catalog']),
  ]);

  return navMenu.asReadonly();
}
