/* eslint-disable @angular-eslint/component-selector */
import { Component, signal } from '@angular/core';
import { FooterMenuComponent } from '../../modules/footer-menu/footer-menu.component';
import { ApplicationMeasurementComponent } from '../../modules/application-measurement/application-measurement.component';
import { MainHeaderComponent } from '../../modules/main-header/main-header.component';
import { PriceCalculationComponent } from '../../modules/price-calculation/price-calculation.component';
import { MenuDeferDirective } from '../../components/menu-defer/menu-defer.directive';
import { MenuDeferService } from '../../components/menu-defer/menu-defer-host.service';
import { NavMenu } from '../../modules/nav-menu/nav-menu';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { PriceList } from '../../modules/catalog-price/catalog-price-list/catalog-price-list';

@Component({
  selector: 'main',
  templateUrl: './price-page.html',
  styleUrls: ['./price-page.scss'],
  imports: [
    FooterMenuComponent,
    ApplicationMeasurementComponent,
    PriceCalculationComponent,
    MainHeaderComponent,
    MenuDeferDirective,
    NavMenu,
    BreadcrumbsHeader,
    PriceList,
  ],
  providers: [MenuDeferService],
  host: {
    'id': 'main',
  },
})
export class PricePage {
  protected readonly breadcrumbs = signal<IBreadcrumbItem[]>([
    {
      title: 'Главная',
      link: ['/'],
    },
    {
      title: 'Цены',
    },
  ]);
}
