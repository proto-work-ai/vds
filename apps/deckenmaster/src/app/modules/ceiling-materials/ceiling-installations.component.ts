/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
  lucideCircleStar,
  lucideStar,
} from '@ng-icons/lucide';
import { TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { TuiTree, TuiSegmented } from '@taiga-ui/kit';
import { PriceListRouteFilter } from '../catalog-price/price-list-route-filter/price-list-route-filter';
import { injectRouteParam } from '../../shared/inject-route-param';
import {
  ProductTagNamePipe,
  stretchCeilingGroupName,
  ThicknessFormatPipe,
  PriceFormatPipe,
} from '../../model/stretch-ceiling';
import { stretchCeilingMaterials } from '../../model/ceiling-materials';
import { IAppMenuItem } from '../../shared/menu';
import { routePath } from '../../app.routes';
import { FormImports } from '../../components/form';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { LeaveRequestModalClick } from '../../components/leave-request-modal/leave-request-modal';

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
    ProductTagNamePipe,
    ThicknessFormatPipe,
    PriceFormatPipe,
    FormImports,
    TuiSegmented,
    RouterLink,
    RouterLinkActive,
    LeaveRequestModalClick,
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
      lucideCircleStar,
      lucideStar,
    }),
  ],
})
export class CeilingInstallationsComponent {
  protected readonly routePath = routePath;
  protected readonly groups = signal<Pick<IAppMenuItem, 'title' | 'queryParams'>[]>([
    {
      title: 'Все',
      queryParams: { category: 'all', country: 0 },
    },
    ...Array.from(stretchCeilingMaterials, ([category]) => {
      return {
        title: stretchCeilingGroupName[category],
        queryParams: { category, country: 0 },
      };
    }),
  ]);

  protected readonly options: IsActiveMatchOptions = {
    queryParams: 'subset',
    matrixParams: 'subset',
    paths: 'subset',
    fragment: 'exact',
  };

  private readonly routeСategory = injectRouteParam('category');
  private readonly routeCountry = injectRouteParam('country');
  protected readonly group = computed(() => (this.routeСategory() != null ? +this.routeСategory()! : -1));

  protected readonly groupFiltered = computed(() => {
    const items = stretchCeilingMaterials.get(this.group());
    return items ?? [...stretchCeilingMaterials.values()].flat();
  });

  protected readonly countryList = computed(() => {
    const list = new Set<string>();
    this.groupFiltered().forEach(({ country }) => {
      list.add(country!);
    });

    const result: { title: string; query: number }[] = [];
    [...list].forEach((title, index) => {
      result.push({ title, query: ++index });
    });

    return [{ title: 'Все', query: '0' }, ...result];
  });

  protected readonly groupBrand = computed(() => {
    const list = new Set<string>();
    this.groupFiltered().forEach(({ brand }) => {
      list.add(brand as any);
    });

    const result: Record<string, string | number>[] = [];

    if (list.size > 2) {
      list.forEach((brand) => {
        result.push({ brand });
      });
    }

    return result;
  });

  protected readonly filtered = computed(() => {
    let list = this.groupFiltered();
    const countryIndex = this.routeCountry();
    const countryes = this.countryList();
    if (countryes.length && countryIndex && countryIndex !== '0') {
      const item = countryes[countryIndex as unknown as number];
      list = list.filter((a) => a.country === item.title);
    }
    return list;
  });
}
