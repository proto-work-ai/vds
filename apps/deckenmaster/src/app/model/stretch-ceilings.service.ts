/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DestroyRef, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { startWith, tap, map } from 'rxjs';
import { IStretchCeiling, stretchCeilingAll, StretchCeilingsGroup, StretchCeilingsType } from './stretch-ceilings.data';
import { IAppMenuItem } from '../shared/menu';

export function injectStretchCeilingsCatalog(): Signal<IStretchCeiling[]> {
  const catalog = signal<IStretchCeiling[]>([]);
  import('./stretch-ceilings.data').then(({ stretchCeilingAll: stretchCeilings }) => catalog.set(stretchCeilings));
  return catalog.asReadonly();
}

export function injectStretchCeilingRouteByKey(): WritableSignal<IStretchCeiling> {
  const destroyRef = inject(DestroyRef);
  const route = inject(ActivatedRoute);
  const items = injectStretchCeilingsCatalog();

  const item = signal<IStretchCeiling | undefined>(undefined);

  if (route.snapshot.data) {
    item.set(route.snapshot.data as IStretchCeiling);
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

  return item as WritableSignal<IStretchCeiling>;
}

export const stretchCeilingsGroupName = {
  [StretchCeilingsGroup.ByTexture]: 'По фактуре',
  [StretchCeilingsGroup.WithBacklight]: 'С подсветкой',
  [StretchCeilingsGroup.Premium]: 'Премиум', // Эксклюзивные потолки
  [StretchCeilingsGroup.ByPremises]: 'По типу помещений',
} as const;

export const stretchCeilingName: Partial<Record<StretchCeilingsType, string>> = {
  // ПВХ
  [StretchCeilingsType.Matte]: 'Матовые',
  [StretchCeilingsType.Glossy]: 'Глянцевые',
  [StretchCeilingsType.Satin]: 'Сатиновые',
  [StretchCeilingsType.Textured]: 'Фактурные',

  // Тканевые
  [StretchCeilingsType.Fabric]: 'Тканевые',
  [StretchCeilingsType.DPremium]: 'D-Premium',
  [StretchCeilingsType.Clipso]: 'Clipso',
  [StretchCeilingsType.Cerutti]: 'Cerutti',

  // С подсветкой
  [StretchCeilingsType.Floating]: 'Парящие',
  [StretchCeilingsType.LightLines]: 'Световые линии',
  [StretchCeilingsType.Contour]: 'C контурной подсветкой',
  [StretchCeilingsType.InternalLighting]: 'C подсветкой внутри',
  [StretchCeilingsType.Lightbox]: 'Лайтбокс',
  [StretchCeilingsType.Slott]: 'Световые линии SLOTT',
  [StretchCeilingsType.Flexy]: 'Световые линии Flexy',

  // Премиум/Эксклюзивные потолки
  [StretchCeilingsType.Shadow]: 'Теневые',
  [StretchCeilingsType.Gapless]: 'Бесщелевые',
  [StretchCeilingsType.WithPhotoPrinting]: 'С фотопечатью',
  [StretchCeilingsType.TwoTiered]: 'Двухуровневые',
  [StretchCeilingsType.MultiLevel]: 'Многоуровневые',
  [StretchCeilingsType.StarrySky]: 'Звездное небо',

  // По типу помещений
  [StretchCeilingsType.Kitchen]: 'На кухню',
  [StretchCeilingsType.Corridor]: 'В коридор',
  [StretchCeilingsType.Bathroom]: 'В ванную',
  [StretchCeilingsType.Bedroom]: 'В спальню',
  [StretchCeilingsType.Nursery]: 'В детскую',
  [StretchCeilingsType.LivingRoom]: 'В гостиную',
  // [StretchCeilingsType.House]: 'В доме',
} as const;

// По групам
export const stretchCeilingGroupMap: Map<StretchCeilingsGroup, StretchCeilingsType[]> = new Map([
  [
    StretchCeilingsGroup.ByTexture,
    [
      StretchCeilingsType.Matte,
      StretchCeilingsType.Glossy,
      StretchCeilingsType.Satin,
      StretchCeilingsType.Textured,
      StretchCeilingsType.Fabric,
    ],
  ],
  [
    StretchCeilingsGroup.WithBacklight,
    [
      StretchCeilingsType.Floating,
      StretchCeilingsType.LightLines,
      StretchCeilingsType.Contour,
      StretchCeilingsType.InternalLighting,

      StretchCeilingsType.Lightbox,
      StretchCeilingsType.Slott,
      StretchCeilingsType.Flexy,
    ],
  ],
  [
    StretchCeilingsGroup.Premium,
    [
      StretchCeilingsType.Shadow,
      StretchCeilingsType.Gapless,
      StretchCeilingsType.WithPhotoPrinting,
      StretchCeilingsType.TwoTiered,
      StretchCeilingsType.MultiLevel,
      StretchCeilingsType.StarrySky,
    ],
  ],
  // [
  //   StretchCeilingsGroup.ByPremises,
  //   [
  //     StretchCeilingsType.Kitchen,
  //     StretchCeilingsType.Corridor,
  //     StretchCeilingsType.Bathroom,
  //     StretchCeilingsType.Bedroom,
  //     StretchCeilingsType.Nursery,
  //     StretchCeilingsType.LivingRoom,
  //   ],
  // ],
  // [ StretchCeilingsGroup.Fabric, [StretchCeilingsType.Fabric, StretchCeilingsType.DPremium, StretchCeilingsType.Clipso, StretchCeilingsType.Cerutti]],
] as const);

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
            title: stretchCeilingName[type] ?? '',
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
      link: ['/catalog'],
      fragment: 'main',
      // children: injectStretchCeilingGroupMenu(['/', 'catalog']),
    },

    ...injectStretchCeilingGroupMenu(['/', 'catalog']),

    {
      title: 'Цены',
      link: ['/', 'price'],
      fragment: 'main',
    },
    // {
    //   title: 'Контакты',
    //   link: ['/', 'contacts'],
    // },
  ]);

  return navMenu.asReadonly();
}

export function injectFooterMenu(patch: string | string[] = []): Signal<IAppMenuItem[]> {
  const navMenu = signal<IAppMenuItem[]>([
    {
      title: 'Каталог',
      link: ['/', 'catalog'],
      fragment: 'main',
    },

    {
      title: 'Цены',
      link: ['/', 'price'],
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
