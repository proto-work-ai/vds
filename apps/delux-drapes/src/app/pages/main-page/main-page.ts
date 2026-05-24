/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, inject, signal } from '@angular/core';
import { MainBannerComponent } from '../../modules/main-banner/main-banner.component';
import { MainFooterComponent } from '../../modules/main-footer/main-footer.component';
import { MenuDeferService } from '../../components/menu-defer/menu-defer-host.service';
import { TuiAccordion, TuiInputPhone, TuiTextarea } from '@taiga-ui/kit';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiCheckbox, TuiTextfield } from '@taiga-ui/core';
import { FormStore } from '../../components/form-store/form-store.directive';
import { MAX_CONTACT, PERIOD_CONTACT, PHONE_CONTACT, TELEGRAM_CONTACT } from '../../contacts';
import { injectFooterMenu } from '../../model/stretch-ceilings.service';
import { MainHeaderComponent } from '../../modules/main-header/main-header.component';
import { IsPlatformBrowserDirective } from '../../components/is-platform-browser.directive';
import { ScrollLink } from '../../components/scroll-link/scroll-link.directive';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMail } from '@ng-icons/lucide';
import { lucidePhone } from '@ng-icons/lucide';
import { lucideMapPin } from '@ng-icons/lucide';
import { YMapComponent, YMapDefaultSchemeLayerDirective } from 'angular-yandex-maps-v3';
import { YMapProps } from '@yandex/ymaps3-types';

@Component({
  selector: 'main',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.scss'],
  imports: [
    MainHeaderComponent,
    MainBannerComponent,
    TuiAccordion,
    ReactiveFormsModule,
    TuiTextfield,
    TuiTextarea,
    TuiCheckbox,
    FormStore,
    MainFooterComponent,
    IsPlatformBrowserDirective,
    ScrollLink,
    NgIcon,
    // YMapComponent,
    // YMapDefaultSchemeLayerDirective,
    TuiInputPhone,
  ],
  providers: [
    provideIcons({
      lucideMapPin,
      lucidePhone,
      lucideMail,
    }),
    MenuDeferService,
  ],
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

  protected readonly yandexMapOptions = signal<YMapProps>({
    location: {
      // center: [-0.127696, 51.507351],
      center: [55.489575, 37.338672],
      zoom: 10,
    },
    theme: 'dark',
  });

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
