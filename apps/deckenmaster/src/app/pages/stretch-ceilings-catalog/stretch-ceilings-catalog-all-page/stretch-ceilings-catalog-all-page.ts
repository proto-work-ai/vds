/* eslint-disable @angular-eslint/component-selector */
import { Component, signal } from '@angular/core';
import { StretchCeilingsCatalogAll } from '../../../modules/stretch-ceilings-catalog/stretch-ceilings-catalog-all/stretch-ceilings-catalog-all';
import { BannerComponent } from '../../../modules/main-banner/main-banner.component';
import { MainHeaderComponent } from '../../../modules/main-header/main-header.component';
import { ApplicationMeasurementComponent } from '../../../modules/application-measurement/application-measurement.component';
import { FooterMenuComponent } from '../../../modules/footer-menu/footer-menu.component';
import { MenuDeferService } from '../../../components/menu-defer/menu-defer-host.service';
import { MenuHeaderComponent } from '../../../modules/menu-header/menu-header.component';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { NavMenu } from "../../../modules/nav-menu/nav-menu";

@Component({
  selector: 'stretch-ceilings-catalog-all-page',
  templateUrl: 'stretch-ceilings-catalog-all-page.html',
  styleUrls: ['stretch-ceilings-catalog-all-page.scss'],
  imports: [
    StretchCeilingsCatalogAll,
    MainHeaderComponent,
    ApplicationMeasurementComponent,
    FooterMenuComponent,
    BreadcrumbsHeader,
    NavMenu
],
  providers: [MenuDeferService],
})
export class StretchCeilingsCatalogsPage {
  protected breadcrumbs = signal<IBreadcrumbItem[]>([
    {
      title: 'Главная',
      link: ['/'],
    },
    {
      title: 'Каталог',
    },
  ] as const);
}
