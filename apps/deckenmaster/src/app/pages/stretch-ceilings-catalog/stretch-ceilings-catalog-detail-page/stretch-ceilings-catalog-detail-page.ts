/* eslint-disable @angular-eslint/component-selector */
import { Component, effect, signal } from '@angular/core';
import { StretchCeilingsCatalogDetail } from '../../../modules/stretch-ceilings-catalog/stretch-ceilings-catalog-detail/stretch-ceilings-catalog-detail';
import { injectStretchCeilingRouteByKey } from '../../../model/stretch-ceilings.service';
import { MainHeaderComponent } from '../../../modules/main-header/main-header.component';
import { ApplicationMeasurementComponent } from '../../../modules/application-measurement/application-measurement.component';
import { FooterMenuComponent } from '../../../modules/footer-menu/footer-menu.component';
import { MenuDeferService } from '../../../components/menu-defer/menu-defer-host.service';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { NavMenu } from "../../../modules/nav-menu/nav-menu";

@Component({
  selector: 'stretch-ceilings-catalog-detail-page',
  templateUrl: 'stretch-ceilings-catalog-detail-page.html',
  styleUrls: ['stretch-ceilings-catalog-detail-page.scss'],
  imports: [
    StretchCeilingsCatalogDetail,
    MainHeaderComponent,
    ApplicationMeasurementComponent,
    FooterMenuComponent,
    BreadcrumbsHeader,
    NavMenu
],
  providers: [MenuDeferService],
})
export class StretchCeilingsCatalogDetailPage {
  protected breadcrumbs = signal<IBreadcrumbItem[]>([]);
  protected readonly item = injectStretchCeilingRouteByKey();

  constructor() {
    effect(() => {
      const item = this.item();
      if (item) {
        this.breadcrumbs.set([
          {
            title: 'Главная',
            link: ['/'],
          },
          {
            title: 'Каталог',
            link: ['/'],
          },
          {
            title: item.title,
          },
        ]);
      }
    });
  }
}
