/* eslint-disable @angular-eslint/component-selector */
import { Component, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ApplicationMeasurementComponent } from '../../modules/application-measurement/application-measurement.component';
import { PriceCalculationComponent } from '../../modules/price-calculation/price-calculation.component';
import { MenuDeferDirective } from '../../components/menu-defer/menu-defer.directive';
import { MenuDeferService } from '../../components/menu-defer/menu-defer-host.service';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { PriceList } from '../../modules/catalog-price/catalog-price-list/catalog-price-list';
import { MainHeaderComponent } from '../../modules/main-header/main-header.component';
import { MainFooterComponent } from "../../modules/main-footer/main-footer.component";

@Component({
  selector: 'main',
  templateUrl: './price-page.html',
  styleUrls: ['./price-page.scss'],
  imports: [
    BreadcrumbsHeader,
    PriceList,
    MainHeaderComponent,
    ApplicationMeasurementComponent,
    PriceCalculationComponent,
    MenuDeferDirective,
    MainFooterComponent
],
  providers: [MenuDeferService],
  host: {
    id: 'main',
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

  constructor() {
    const title = `Decken Master | Цены на натяжные потолки`;
    inject(Title).setTitle(title);
    inject(Meta).updateTag({ property: 'og:title', content: title });

    inject(Meta).updateTag({
      name: 'description',
      content: `Цена на натяжные потолки в среднем составляет от 200 до 2000 рублей за 1м² с установкой. Расчет стоимости обычно включает полотно и монтаж.`,
    });
  }
}
