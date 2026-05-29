/* eslint-disable @angular-eslint/component-selector */
import { Component, signal } from '@angular/core';
import { StretchCeilingsCatalogAll } from '../../../modules/stretch-ceilings-catalog/stretch-ceilings-catalog-all/stretch-ceilings-catalog-all';
import { ApplicationMeasurementComponent } from '../../../modules/application-measurement/application-measurement.component';
import { MenuDeferService } from '../../../components/menu-defer/menu-defer-host.service';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { WayWeWorkComponent } from "../../../modules/way-we-work/way-we-work.component";

@Component({
  selector: 'main',
  templateUrl: 'catalog-all-page.html',
  styleUrls: ['catalog-all-page.scss'],
  imports: [
    StretchCeilingsCatalogAll,
    ApplicationMeasurementComponent,
    BreadcrumbsHeader,
    WayWeWorkComponent
],
  providers: [MenuDeferService],
  host: {
    'id': 'main',
  },
})
export class CatalogsPage {
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
