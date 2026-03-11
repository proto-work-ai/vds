/* eslint-disable @nx/enforce-module-boundaries */
import { DestroyRef, inject, Signal, signal } from '@angular/core';
import { ISignalMenuItem } from '../../../common/menu';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export function injectMenuItems(): Signal<ISignalMenuItem[]> {
  const destroyRef = inject(DestroyRef);
  const route = inject(ActivatedRoute);
  const router = inject(Router);

  const menu = [
    {
      title: 'Entities',
      link: 'entities',
      icon: 'lucideBraces',
      active: signal(false),
      children: signal([
        { title: 'Table1', link: '#', icon: '' },
        { title: 'Table2', link: '#', icon: '' },
      ]),
    },
    {
      title: 'Attributes',
      link: 'attributes',
      icon: 'lucideBox',
      active: signal(false),
      children: signal([
        { title: 'Table1', link: '#', icon: '' },
        { title: 'Table2', link: '#', icon: '' },
      ]),
    },
    {
      title: 'Records',
      link: 'records',
      icon: 'lucideLayersPlus',
      active: signal(false),
      children: signal([
        { title: 'Table1', link: '#', icon: '' },
        { title: 'Table2', link: '#', icon: '' },
      ]),
    },
    {
      title: 'Values',
      link: 'values',
      icon: 'lucideDatabase',
      active: signal(false),
      children: signal([
        { title: 'Table1', link: '#', icon: '' },
        { title: 'Table2', link: '#', icon: '' },
      ]),
    },
  ];

  router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(true),
      map(() => route.snapshot.firstChild?.routeConfig?.path),
      filter(Boolean),
      tap((routePath) =>
        menu.forEach((item) => {
          item.active.set(routePath.startsWith(item.link))
        }),
      ),
      takeUntilDestroyed(destroyRef),
    )
    .subscribe();

  return signal<ISignalMenuItem[]>(menu).asReadonly();
}
