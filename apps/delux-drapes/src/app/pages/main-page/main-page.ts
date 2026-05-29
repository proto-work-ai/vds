/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, inject, signal } from '@angular/core';
import { MainBannerComponent } from '../../modules/main-banner/main-banner.component';
import { MainFooterComponent } from '../../modules/main-footer/main-footer.component';
import { MenuDeferService } from '../../components/menu-defer/menu-defer-host.service';
import { TuiAccordion, TuiInputPhone, TuiTextarea } from '@taiga-ui/kit';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiCheckbox, TuiTextfield } from '@taiga-ui/core';
import { FormStore } from '../../components/form-store/form-store.directive';
import { MAX_CONTACT, PERIOD_CONTACT, PHONE_CONTACT, TELEGRAM_CONTACT, VAR_YANDEX_KEY } from '../../contacts';
import { injectFooterMenu } from '../../model/catalog.service';
import { MainHeaderComponent } from '../../modules/main-header/main-header.component';
import { IsPlatformBrowserDirective } from '../../components/is-platform-browser.directive';
import { ScrollLink } from '../../components/scroll-link/scroll-link.directive';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMail } from '@ng-icons/lucide';
import { lucidePhone } from '@ng-icons/lucide';
import { lucideMapPin } from '@ng-icons/lucide';
import { YMapComponent, YMapDefaultSchemeLayerDirective } from 'angular-yandex-maps-v3';
import { YMapProps } from '@yandex/ymaps3-types';
import { PlaceAnOrder } from '../../modules/place-an-order/place-an-order.component';
import { MainCatalog } from '../../modules/main-catalog/main-catalog.component';
import { WayWeWorkComponent } from '../../modules/way-we-work/way-we-work.component';
import { MainWorks } from '../../modules/main-works/main-works.component';
import { MainForm } from '../../modules/main-form/main-form.component';
import { MainCatalogAccessories } from '../../modules/main-catalog-accessories/main-catalog-accessories.component';
import { MainPromotionsDiscounts } from '../../modules/main-promotions-discounts/main-promotions-discounts.component';
import { MainPrice } from '../../modules/main-price/main-price.component';
import { MainProduction } from '../../modules/main-production/main-production.component';
import { MainFabric } from '../../modules/main-fabric/main-fabric.component';
import { MainArticles } from '../../modules/main-articles/main-articles.component';
import { MainTypesPremises } from '../../modules/main-types-premises/main-types-premises.component';
import { MainTeam } from '../../modules/main-team/main-team.component';
import { MainClients } from '../../modules/main-clients/main-clients.component';
import { MainAbout } from '../../modules/main-about/main-about.component';
import { MainQuestions } from '../../modules/main-questions/main-questions.component';
import { MainToOrder } from '../../modules/main-to-order/main-to-order.component';
import { MainBannerForm } from '../../modules/main-banner-form/main-banner-form.component';

@Component({
  selector: 'main',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.scss'],
  imports: [
    TuiAccordion,
    ReactiveFormsModule,
    TuiTextfield,
    TuiTextarea,
    TuiInputPhone,
    MainFooterComponent,
    MainHeaderComponent,
    MainBannerComponent,
    PlaceAnOrder,
    MainCatalog,
    WayWeWorkComponent,
    MainWorks,
    MainForm,
    MainCatalogAccessories,
    MainPromotionsDiscounts,
    MainPrice,
    MainProduction,
    MainFabric,
    MainTypesPremises,
    MainArticles,
    MainClients,
    MainAbout,
    MainQuestions,
    MainToOrder,
    IsPlatformBrowserDirective,
    ScrollLink,
    NgIcon,
    YMapComponent,
    YMapDefaultSchemeLayerDirective,
    TuiCheckbox,
    FormStore,
    // MainTeam,
    MainBannerForm,
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
      center: [37.623082, 55.75254],
      zoom: 9,
    },
    showScaleInCopyrights: true,
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
