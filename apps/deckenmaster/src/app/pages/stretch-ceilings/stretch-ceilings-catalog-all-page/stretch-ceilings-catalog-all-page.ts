/* eslint-disable @angular-eslint/component-selector */
import { Component, signal } from '@angular/core';
import { StretchCeilingsCatalogAll } from '../../../modules/stretch-ceilings-catalog/stretch-ceilings-catalog-all/stretch-ceilings-catalog-all';
import { MainHeaderComponent } from '../../../modules/main-header/main-header.component';
import { ApplicationMeasurementComponent } from '../../../modules/application-measurement/application-measurement.component';
import { FooterMenuComponent } from '../../../modules/footer-menu/footer-menu.component';
import { MenuDeferService } from '../../../components/menu-defer/menu-defer-host.service';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { NavMenu } from '../../../modules/nav-menu/nav-menu';
import { WayWeWorkComponent } from "../../../modules/way-we-work/way-we-work.component";

@Component({
  selector: 'main',
  templateUrl: 'stretch-ceilings-catalog-all-page.html',
  imports: [
    StretchCeilingsCatalogAll,
    MainHeaderComponent,
    ApplicationMeasurementComponent,
    FooterMenuComponent,
    BreadcrumbsHeader,
    NavMenu,
    WayWeWorkComponent
],
  providers: [MenuDeferService],
  host: {
    'id': 'main',
  },
})
export class StretchCeilingsCatalogsPage {
  protected readonly breadcrumbs = signal<IBreadcrumbItem[]>([
    {
      title: 'Главная',
      link: ['/'],
    },
    {
      title: 'Каталог',
    },
  ] as const);
}
