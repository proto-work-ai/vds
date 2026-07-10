import { Component, computed, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  lucideChevronDown,
  lucideLink,
  lucideCircle,
  lucideCheck,
  lucideInfo,
  lucidePhone,
  lucideMenu,
  lucideX,
  lucideChevronRight,
} from '@ng-icons/lucide';
import { TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { TuiTree } from '@taiga-ui/kit';
import { PriceListRouteFilter } from '../catalog-price/price-list-route-filter/price-list-route-filter';
import { injectRouteParam } from '../../shared/inject-route-param';
import { STPriceGroup, stretchCeilingGroupName } from '../../model/stretch-ceiling';
import { stretchCeilingMaterials } from '../../model/ceiling-materials';
import { IAppMenuItem } from '../../shared/menu';
import { routePath } from '../../app.routes';

@Component({
  selector: 'app-ceiling-materials',
  templateUrl: './ceiling-installations.component.html',
  styleUrls: ['./ceiling-installations.component.scss'],
  imports: [
    TuiDataList,
    TuiDropdown,
    TuiTree,
    HlmIconImports,
    HlmNavigationMenuImports,
    PriceListRouteFilter,
  ],
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideLink,
      lucideCircle,
      lucideCheck,
      lucideInfo,
      lucidePhone,
      lucideMenu,
      lucideX,
      lucideChevronRight,
    }),
  ],
})
export class CeilingInstallationsComponent {
  protected readonly routePath = routePath;
  protected readonly groups = signal<Pick<IAppMenuItem, 'title' | 'queryParams'>[]>(
    Array.from(stretchCeilingMaterials, ([category]) => {
      return {
        title: stretchCeilingGroupName[category],
        queryParams: { category },
      };
    })
  );

  private readonly routeCategory = injectRouteParam('category');
  protected readonly category = computed(() => (this.routeCategory() != null ? +this.routeCategory()! : -1));

  protected readonly filtered = computed(() => {
    const items = stretchCeilingMaterials.get(this.category());
    return items ?? stretchCeilingMaterials.get(STPriceGroup.PVC);
  });
}
