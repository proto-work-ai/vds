import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { injectStretchCeilingGroupMenu, injectStretchCeilingsCatalog } from '../../../model/stretch-ceilings.service';
import { routePath } from '../../../app.routes';
import { injectRouteParam } from '../../../shared/inject-route-param';
import { IAppMenuItem } from '../../../shared/menu';
import { ScrollLink } from '../../../components/scroll-link/scroll-link.directive';
import { stretchCeilingGroupMap } from '../../../model/stretch-ceiling';
import { StretchCeilingsCatalogCard } from '../stretch-ceilings-catalog-card/stretch-ceilings-catalog-card';
import { SCCatalogRouteFilter } from '../stretch-ceilings-catalog-route-filter/stretch-ceilings-catalog-route-filter';

@Component({
  selector: 'app-stretch-ceilings-catalog-all',
  templateUrl: './stretch-ceilings-catalog-all.html',
  styleUrls: ['./stretch-ceilings-catalog-all.scss'],
  imports: [StretchCeilingsCatalogCard, RouterLink, SCCatalogRouteFilter, ScrollLink],
})
export class StretchCeilingsCatalogAll {
  readonly title = input('Каталог натяжных потолков');
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly route = inject(ActivatedRoute);
  protected readonly routePath = routePath;

  protected readonly groups = signal<Pick<IAppMenuItem, 'title' | 'queryParams'>[]>([
    {
      title: 'Все виды',
      queryParams: {},
    },
    ...injectStretchCeilingGroupMenu().slice(0, 3), // Все кромя "По типу"
  ]);

  private readonly items = injectStretchCeilingsCatalog();
  protected readonly groupParam = injectRouteParam('group');
  protected readonly filtered = computed(() => {
    const items = this.items();
    const group = this.groupParam()!;
    const types = stretchCeilingGroupMap.get(+group);
    if (types) {
      return items.filter((a) => new Set([...types, ...a.types]).size < types.length + a.types.length);
    } else {
      return items;
    }
  });
}
