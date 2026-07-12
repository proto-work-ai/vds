/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component } from '@angular/core';
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
import {
  ProductTagNamePipe,
  ThicknessFormatPipe,
  PriceFormatPipe,
} from '../../model/stretch-ceiling';
import { FormImports } from '../../components/form';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LeaveRequestModalClick } from '../../components/leave-request-modal/leave-request-modal';

@Component({
  selector: 'app-ceiling-events',
  templateUrl: './ceiling-events.component.html',
  styleUrls: ['./ceiling-events.component.scss'],
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
export class CeilingEventsComponent {}
