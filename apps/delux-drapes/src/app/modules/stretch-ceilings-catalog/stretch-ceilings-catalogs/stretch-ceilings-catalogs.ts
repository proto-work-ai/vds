import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectStretchCeilingGroupMenu, injectStretchCeilingsCatalog } from '../../../model/stretch-ceilings.service';
import { StretchCeilingsCatalogCard } from '../stretch-ceilings-catalog-card/stretch-ceilings-catalog-card';
import { routePath } from '../../../app.routes';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { injectRouteParam } from '../../../shared/inject-route-param';
import { SCCatalogRouteFilter } from '../stretch-ceilings-catalog-route-filter/stretch-ceilings-catalog-route-filter';
import { IAppMenuItem } from '../../../shared/menu';
import { ScrollLink } from '../../../components/scroll-link/scroll-link.directive';
import { stretchCeilingGroupMap } from '../../../model/products.data';

@Component({
  selector: 'app-stretch-ceilings-catalogs',
  templateUrl: './stretch-ceilings-catalogs.html',
  styleUrls: ['./stretch-ceilings-catalogs.scss'],
  imports: [StretchCeilingsCatalogCard, RouterLink, SCCatalogRouteFilter, ScrollLink],
  providers: [
    provideIcons({
      lucideChevronRight,
    }),
  ],
})
export class StretchCeilingsCatalogs {
  readonly title = input('Каталог натяжных потолков');
  protected readonly items = injectStretchCeilingsCatalog();
  protected readonly routePath = routePath;

  protected readonly groups = signal<IAppMenuItem[]>([
    ...injectStretchCeilingGroupMenu().slice(0, 3), // Все кромя "По типу"
    {
      title: 'Весь список',
      link: ['/catalog'],
      fragment: 'main',
      queryParams: {},
    },
  ]);

  protected readonly groupParam = injectRouteParam('group');
  protected readonly filtered = computed(() => {
    const items = this.items();
    const group = this.groupParam()! ?? this.groups()[0]?.queryParams?.['group'];
    const types = stretchCeilingGroupMap.get(+group);
    if (types) {
      return items.filter((a) => new Set([...types, ...a.types]).size < types.length + a.types.length);
    } else {
      return items;
    }
  });
}
