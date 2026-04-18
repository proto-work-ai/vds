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
import { MenuHeaderComponent } from "../../modules/menu-header/menu-header.component";
import { NavMenu } from "../../modules/nav-menu/nav-menu";

@Component({
  selector: 'main',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.scss'],
  imports: [
    // FromToComponent,
    // TurnkeySolutionsComponent,
    // LeaveRequestComponent,
    BannerComponent,
    FooterMenuComponent,
    WayWeWorkComponent,
    CeilingInstallationsComponent,
    ApplicationMeasurementComponent,
    PriceCalculationComponent,
    MainHeaderComponent,
    MenuDeferDirective,
    StretchCeilingsCatalogs,
    MenuHeaderComponent,
    NavMenu
],
  providers: [MenuDeferService],
})
export class MainPage {}
