/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { BannerComponent } from '../../modules/main-banner/main-banner.component';
import { FooterMenuComponent } from '../../modules/footer-menu/footer-menu.component';
import { StretchCeilingsCatalogs } from '../../modules/stretch-ceilings-catalog/stretch-ceilings-catalogs/stretch-ceilings-catalogs';
import { WayWeWorkComponent } from '../../modules/way-we-work/way-we-work.component';
import { CeilingInstallationsComponent } from '../../modules/ceiling-installations/ceiling-installations.component';
import { ApplicationMeasurementComponent } from '../../modules/application-measurement/application-measurement.component';
import { MainHeaderComponent } from '../../modules/main-header/main-header.component';
import { PriceCalculationComponent } from '../../modules/price-calculation/price-calculation.component';
import { MenuDeferDirective } from '../../components/menu-defer/menu-defer.directive';
import { MenuDeferService } from '../../components/menu-defer/menu-defer-host.service';
import { MenuHeaderComponent } from '../../modules/menu-header/menu-header.component';
import { NavMenu } from '../../modules/nav-menu/nav-menu';
import { CeilingCalculator } from '../../components/ceiling-calculator/ceiling-calculator';
import { FromToComponent } from '../../modules/from-to/from-to.component';
import { TurnkeySolutionsComponent } from '../../modules/turnkey-solution/turnkey-solutions/turnkey-solutions.component';
import { LeaveRequestComponent } from '../../modules/leave-request/leave-request.component';
import { setMeta } from '@atlas/core';
import { PhotosWorksComponent } from "../../modules/photos-works/photos-works";

@Component({
  selector: 'main',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.scss'],
  imports: [
    BannerComponent,
    FooterMenuComponent,
    WayWeWorkComponent,
    CeilingInstallationsComponent,
    ApplicationMeasurementComponent,
    MainHeaderComponent,
    StretchCeilingsCatalogs,
    NavMenu,
    CeilingCalculator,
    FromToComponent,
    PriceCalculationComponent,
    MenuDeferDirective,
    MenuHeaderComponent,
    TurnkeySolutionsComponent,
    LeaveRequestComponent,
    PhotosWorksComponent
],
  // providers: [MenuDeferService],
  host: {
    id: 'main',
  },
})
export class MainPage {
  constructor() {
    setMeta({
      title: `DeckenMaster | Натяжные потолки купить недорого в Москве с установкой, заказать потолок`,
      description: `Натяжные потолки любых видов и сложности. Поможем с выбором идеального варианта! Качественные материалы. Опытные мастера!`,
    });
  }
}
