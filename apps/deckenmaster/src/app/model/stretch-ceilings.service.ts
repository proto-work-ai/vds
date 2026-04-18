import { DestroyRef, effect, inject, signal, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { startWith, tap, map } from 'rxjs';
import { IStretchCeiling, StretchCeilingsGroup, StretchCeilingsType } from './stretch-ceilings.data';
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
  [StretchCeilingsGroup.PVC]: 'ПВХ',
  [StretchCeilingsGroup.Fabric]: 'Тканевые',
  [StretchCeilingsGroup.WithBacklight]: 'С подсветкой',
  [StretchCeilingsGroup.Premium]: 'Премиум',
} as const;

export const stretchCeilingsTypeName = {
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
  [StretchCeilingsType.Slott]: 'SLOTT',

  // Премиум
  [StretchCeilingsType.Shadow]: 'Теневые',
  [StretchCeilingsType.Gapless]: 'Бесщелевые',
  [StretchCeilingsType.WithPhotoPrinting]: 'С фотопечатью',
  [StretchCeilingsType.TwoTiered]: 'Двухуровневые',
  [StretchCeilingsType.StarrySky]: 'Звездное небо',
} as const;

// По групам
export const stretchCeilingsSet: Map<StretchCeilingsGroup, StretchCeilingsType[]> = new Map([
  [
    StretchCeilingsGroup.PVC,
    [StretchCeilingsType.Matte, StretchCeilingsType.Glossy, StretchCeilingsType.Satin, StretchCeilingsType.Textured],
  ],
  [
    StretchCeilingsGroup.Fabric,
    [StretchCeilingsType.Fabric, StretchCeilingsType.DPremium, StretchCeilingsType.Clipso, StretchCeilingsType.Cerutti],
  ],
  [
    StretchCeilingsGroup.WithBacklight,
    [
      StretchCeilingsType.Floating,
      StretchCeilingsType.LightLines,
      StretchCeilingsType.Lightbox,
      StretchCeilingsType.Contour,
      StretchCeilingsType.Slott,
    ],
  ],
  [
    StretchCeilingsGroup.Premium,
    [
      StretchCeilingsType.Shadow,
      StretchCeilingsType.Gapless,
      StretchCeilingsType.WithPhotoPrinting,
      StretchCeilingsType.TwoTiered,
      StretchCeilingsType.StarrySky,
    ],
  ],
] as const);

export function injectStretchCeilingGroupMenu(patch: string | string[]): IAppMenuItem[] {
  const menu = Array.from(stretchCeilingsSet, ([group, types]) => {
    return {
      title: stretchCeilingsGroupName[group],
      group: true,
      children: types.map((type) => {
        return {
          title: stretchCeilingsTypeName[type],
          link: patch,
          queryParams: { type },
        } satisfies IAppMenuItem;
      }),
    } satisfies IAppMenuItem;
  });
  return menu;
}
