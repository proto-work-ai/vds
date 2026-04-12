import { Component } from '@angular/core';
import { BannerComponent } from '../../modules/main-banner/main-banner.component';
import { FooterMenuComponent } from '../../modules/footer-menu/footer-menu.component';
import { WorkTypesComponent } from '../../modules/work-types/work-types.component';
import { FromToComponent } from '../../modules/from-to/from-to.component';
import { WayWeWorkComponent } from '../../modules/way-we-work/way-we-work.component';
import { CeilingInstallationsComponent } from '../../modules/ceiling-installations/ceiling-installations.component';
import { ApplicationMeasurementComponent } from '../../modules/application-measurement/application-measurement.component';
import { TurnkeySolutionsComponent } from '../../modules/turnkey-solutions/turnkey-solutions.component';
import { LeaveRequestComponent } from '../../modules/leave-request/leave-request.component';
import { MainHeaderComponent } from '../../modules/main-header/main-header.component';
import { PriceCalculationComponent } from '../../modules/price-calculation/price-calculation.component';

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
  ],
})
export class MainPageComponent {}
