/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @nx/enforce-module-boundaries */
import { DestroyRef, inject, InjectionToken, Signal, signal, ValueProvider } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EMPTY, filter, map, merge, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MetaEntityService } from '../services/studio-entity.service';
import { ISignalMenuItem } from '../../../common/menu';
import { contentPages, studioPages } from '../meta.route';
import { MetaEntity } from '@prisma/client';

export const MENU_CHANGE_EVENT = new InjectionToken<Subject<void>>('MENU_CHANGE_EVENT');

export function menuChangeProvider(): ValueProvider {
  return {
    provide: MENU_CHANGE_EVENT,
    useValue: new Subject<void>()
  };
}

export function injectStudioMenu(): Signal<ISignalMenuItem[]> {
  const destroyRef = inject(DestroyRef);
  const route = inject(ActivatedRoute);
  const router = inject(Router);

  const menu = [
    {
      title: 'Entities',
      link: `${studioPages.root}/${studioPages.entities.root}`,
      icon: 'lucideBraces',
      active: signal(false),
      children: signal([
        { title: 'Table1', link: '#', icon: '' },
        { title: 'Table2', link: '#', icon: '' },
      ]),
    },
    // {
    //   title: 'Attributes',
    //   link: `${studioPages.root}/${studioPages.attributes.root}`,
    //   icon: 'lucideBox',
    //   active: signal(false),
    //   children: signal([
    //     { title: 'Table1', link: '#', icon: '' },
    //     { title: 'Table2', link: '#', icon: '' },
    //   ]),
    // },
    {
      title: 'Records',
      link: `${studioPages.root}/${studioPages.records.root}`,
      icon: 'lucideLayers',
      active: signal(false),
      children: signal([
        { title: 'Table1', link: '#', icon: '' },
        { title: 'Table2', link: '#', icon: '' },
      ]),
    },
    {
      title: 'Values',
      link: `${studioPages.root}/${studioPages.values.root}`,
      icon: 'lucideDatabase',
      active: signal(false),
      children: signal([
        { title: 'Table1', link: '#', icon: '' },
        { title: 'Table2', link: '#', icon: '' },
      ]),
    },
  ] satisfies ISignalMenuItem[];

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

export function injectContentMenu(): Signal<ISignalMenuItem[]> {
  const destroyRef = inject(DestroyRef);
  const route = inject(ActivatedRoute);
  const router = inject(Router);
  const entityService = inject(MetaEntityService);
  const menuChangeEvent = inject(MENU_CHANGE_EVENT, { optional: true }) ?? of<void>();
  const menu = signal<ISignalMenuItem[]>([]);

  menuChangeEvent.pipe(
    startWith(undefined),
    switchMap(() => entityService.getAll({ page: 1, limit: 20 })),
    map(({ data }) => data),
    tap((data) => {
      menu.update(() => {
        return data.map(({ id, title }) => {
          return {
            title: title!,
            link: `${contentPages.root}/${contentPages.data.root}/${id}`,
            // icon: 'lucideLayersPlus',
            icon: 'lucideDot',
            active: signal(false),
          } satisfies ISignalMenuItem
        });
      });
    }),
    switchMap(() => {
      return router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(true),
        map(() => route.snapshot.firstChild?.url.join('/')!),
        tap((url: string) => {
          menu().forEach((item) => item.active?.set(url.startsWith(item.link)))
        }),
      )
    }),
    takeUntilDestroyed(destroyRef)
  ).subscribe();

  return menu.asReadonly();
}