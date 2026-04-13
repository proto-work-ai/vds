import { Component } from '@angular/core';
import { BannerComponent } from '../../modules/main-banner/main-banner.component';
import { FooterMenuComponent } from '../../modules/footer-menu/footer-menu.component';
import { WorkTypesComponent } from '../../modules/work-types/work-types.component';
import { WayWeWorkComponent } from '../../modules/way-we-work/way-we-work.component';
import { CeilingInstallationsComponent } from '../../modules/ceiling-installations/ceiling-installations.component';
import { ApplicationMeasurementComponent } from '../../modules/application-measurement/application-measurement.component';
import { MainHeaderComponent } from '../../modules/main-header/main-header.component';
import { PriceCalculationComponent } from '../../modules/price-calculation/price-calculation.component';
import { MenuDeferDirective } from '../../components/menu-defer/menu-defer.directive';
import { MenuDeferService } from '../../components/menu-defer/menu-defer-host.service';
import { ScrollLink } from '../../components/scroll-link/scroll-link.directive';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  imports: [
    // FromToComponent,
    // TurnkeySolutionsComponent,
    // LeaveRequestComponent,
    BannerComponent,
    FooterMenuComponent,
    WorkTypesComponent,
    WayWeWorkComponent,
    CeilingInstallationsComponent,
    ApplicationMeasurementComponent,
    PriceCalculationComponent,
    MainHeaderComponent,
    MenuDeferDirective,
  ],
  providers: [MenuDeferService],
})
export class MainPageComponent {}
