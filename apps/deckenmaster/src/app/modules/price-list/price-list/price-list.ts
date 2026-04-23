import { Component, computed, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
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
import { TuiDataList, TuiDropdown, TuiIcon, TuiPopup, TuiTitle } from '@taiga-ui/core';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { RouterLink } from '@angular/router';
import { TuiHeader } from '@taiga-ui/layout';
import { TuiDrawer, TuiTree } from '@taiga-ui/kit';
import { JsonPipe } from '@angular/common';
import { routePath } from '../../../app.routes';
import { IAppMenuItem } from '../../../shared/menu';
import { dataCategoryMap, getCategoryMap, STCategoryType, STPriceBrand } from '../../../model/price-list.service';
import { ScrollLink } from '../../../components/scroll-link/scroll-link.directive';
import { injectRouteParam } from '../../../shared/inject-route-param';
import { PriceListRouteFilter } from '../price-list-route-filter/price-list-route-filter';
import { PriceListBrandTable } from '../price-list-brand-table/price-list-brand-table';
import { ColumnAttributeTable } from '@atlas/core';
import { PriceListUnitTable } from '../price-list-unit-table/price-list-unit-table';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.html',
  styleUrl: 'price-list.scss',
  imports: [
    TuiDataList,
    TuiDropdown,
    TuiTree,
    HlmIconImports,
    HlmNavigationMenuImports,
    PriceListRouteFilter,
    JsonPipe,
    NgIcon,
    TuiDrawer,
    TuiPopup,
    TuiTitle,
    TuiHeader,
    RouterLink,
    TuiIcon,
    ScrollLink,
    PriceListBrandTable,
    PriceListUnitTable,
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
export class PriceList {
  protected readonly routePath = routePath;
  protected readonly title = signal('Цены на натяжные потолки');
  protected readonly groups = signal<Pick<IAppMenuItem, 'title' | 'queryParams'>[]>(
    Array.from(dataCategoryMap, ([category, name]) => {
      return {
        title: name,
        queryParams: { category },
      };
    })
  );

  protected readonly dataMap = getCategoryMap();
  private readonly routeCategory = injectRouteParam('category');
  protected readonly category = computed(() => {
    return +this.routeCategory()!;
  });

  protected readonly filtered = computed(() => {
    const items = this.dataMap(this.category()) as STPriceBrand[];
    return items ?? this.dataMap(STCategoryType.PVC);
  });
}
