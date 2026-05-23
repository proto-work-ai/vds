/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, inject } from '@angular/core';
import { BannerComponent } from '../../modules/main-banner/main-banner.component';
import { MainFooterComponent } from '../../modules/main-footer/main-footer.component';
import { StretchCeilingsCatalogs } from '../../modules/stretch-ceilings-catalog/stretch-ceilings-catalogs/stretch-ceilings-catalogs';
import { WayWeWorkComponent } from '../../modules/way-we-work/way-we-work.component';
import { CeilingInstallationsComponent } from '../../modules/ceiling-installations/ceiling-installations.component';
import { ApplicationMeasurementComponent } from '../../modules/application-measurement/application-measurement.component';
import { PriceCalculationComponent } from '../../modules/price-calculation/price-calculation.component';
import { MenuDeferDirective } from '../../components/menu-defer/menu-defer.directive';
import { MenuDeferService } from '../../components/menu-defer/menu-defer-host.service';
import { TuiAccordion, TuiInputPhone, TuiTextarea } from '@taiga-ui/kit';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiCheckbox, TuiTextfield } from '@taiga-ui/core';
import { FormStore } from '../../components/form-store/form-store.directive';
import { MAX_CONTACT, PERIOD_CONTACT, PHONE_CONTACT, TELEGRAM_CONTACT } from '../../contacts';
import { injectFooterMenu } from '../../model/stretch-ceilings.service';
import { RouterLink } from '@angular/router';
import { ScrollLink } from '../../components/scroll-link/scroll-link.directive';
import { PhoneFormatPipe } from '@atlas/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'main',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.scss'],
  imports: [
    BannerComponent,
    WayWeWorkComponent,
    CeilingInstallationsComponent,
    ApplicationMeasurementComponent,
    PriceCalculationComponent,
    MenuDeferDirective,
    StretchCeilingsCatalogs,
    TuiAccordion,
    ReactiveFormsModule,
    TuiTextfield,
    TuiTextarea,
    TuiCheckbox,
    FormStore,
    TuiInputPhone,
    RouterLink,
    ScrollLink,
    PhoneFormatPipe,
    NgTemplateOutlet,
    MainFooterComponent
],
  providers: [MenuDeferService],
  host: {
    id: 'main',
  },
})
export class MainPage {
  protected readonly form = new FormGroup({
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    description: new FormControl(undefined, []),
    checked: new FormControl(undefined, []),
  });
  
  protected readonly items = inject(MenuDeferService).items;
  protected readonly telegramContact = inject(TELEGRAM_CONTACT);
  protected readonly maxContact = inject(MAX_CONTACT);
  protected readonly phoneContact = inject(PHONE_CONTACT);
  protected readonly periodContact = inject(PERIOD_CONTACT);

  private readonly navMenu = injectFooterMenu();
  protected readonly footerMenu = computed(() => {
    const menu = this.navMenu();
    const result = [];

    result.push({
      title: 'Меню',
      children: [...menu.slice(0, 1), ...menu.slice(2, 3)],
    });

    result.push(...menu.slice(3));
    return result;
  });

  protected formSubmit(): void {}
}
