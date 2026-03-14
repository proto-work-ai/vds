/* eslint-disable @nx/enforce-module-boundaries */
import { DestroyRef, inject, Signal, signal } from '@angular/core';
import { ISignalMenuItem } from '../../../common/menu';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MetaEntityService } from '../services/studio-entity.service';
import { contentPages, studioPages } from '../meta.route';

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

  const menu = signal<ISignalMenuItem[]>([]);

  entityService.getAll({ currentPage: 1, length: 20 }).pipe(
    map(({ data }) => data),
    tap((data) => {
      menu.update(() => {
        return data.map(({ id, name, title }) => {
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
    takeUntilDestroyed(destroyRef)
  ).subscribe();

  router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(true),
      filter(Boolean),
      map(() => route.snapshot.firstChild?.url.join('/')),
      tap((routePath) => {
        menu().forEach((item) => {
          item.active?.set(routePath!.startsWith(item.link))
        })
      }
      ),
      takeUntilDestroyed(destroyRef),
    )
    .subscribe();

  return menu.asReadonly();
}