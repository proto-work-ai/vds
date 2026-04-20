import { DestroyRef, effect, inject, signal, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { startWith, tap, map } from 'rxjs';
import { IStretchCeiling, stretchCeilings, StretchCeilingsGroup, StretchCeilingsType } from './stretch-ceilings.data';
import { IAppMenuItem } from '../shared/menu';

export function injectStretchCeilingsCatalog(): Signal<IStretchCeiling[]> {
  const catalog = signal<IStretchCeiling[]>([]);
  import('./stretch-ceilings.data').then(({ stretchCeilings }) => catalog.set(stretchCeilings));
  return catalog.asReadonly();
}

export function injectStretchCeilingRouteByKey() {
  const destroyRef = inject(DestroyRef);
  const route = inject(ActivatedRoute);
  const items = injectStretchCeilingsCatalog();

  const item = signal<any>(undefined);
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

  return item;
}

export const stretchCeilingsGroupName = {
  [StretchCeilingsGroup.ByTexture]: 'По фактуре',
  [StretchCeilingsGroup.WithBacklight]: 'С подсветкой',
  [StretchCeilingsGroup.Premium]: 'Премиум', // Эксклюзивные потолки 
  [StretchCeilingsGroup.ByPremises]: 'По типу помещений',
} as const;

export const stretchCeilingsTypeName: Partial<Record<StretchCeilingsType, string>> = {
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
  [StretchCeilingsType.Lightbox]: 'Лайтбокс',
  [StretchCeilingsType.Contour]: 'Контурные',
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
      StretchCeilingsType.Lightbox,
      StretchCeilingsType.Contour,
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
  const menu = Array.from(stretchCeilingGroupMap, ([group, types]) => {
    const children = types
      // Если нет в каталоге то не выводим
      .filter((type) => stretchCeilings.some((a) => a.types.includes(type)))
      .map((type) => {
        return {
          title: stretchCeilingsTypeName[type] ?? '',
          link: patch,
          queryParams: { type },
        } satisfies IAppMenuItem;
      });

    return {
      title: stretchCeilingsGroupName[group],
      queryParams: { group },
      children,
    } satisfies IAppMenuItem;
  });
  return menu;
}

export function injectNavMenu(patch: string | string[] = []): Signal<IAppMenuItem[]> {
  const navMenu = signal<IAppMenuItem[]>([
    {
      title: 'Каталог',
      children: injectStretchCeilingGroupMenu(['/', 'catalog']),
    },
    // {
    //   title: 'Цены',
    //   link: ['/', 'price'],
    // },
    // {
    //   title: 'Контакты',
    //   link: ['/', 'contacts'],
    // },
    // {
    //   title: 'О компании',
    //   link: ['/', 'about'],
    // },
  ]);

  return navMenu.asReadonly();
}
