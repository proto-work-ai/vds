/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, inject, signal } from '@angular/core';
import { MainBannerComponent } from '../../modules/main-banner/main-banner.component';
import { MainFooterComponent } from '../../modules/main-footer/main-footer.component';
import { MenuDeferService } from '../../components/menu-defer/menu-defer-host.service';
import { TuiAccordion, TuiInputPhone, TuiTextarea } from '@taiga-ui/kit';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { MAX_CONTACT, PERIOD_CONTACT, PHONE_CONTACT, TELEGRAM_CONTACT } from '../../contacts';
import { injectFooterMenu } from '../../model/catalog.service';
import { MainHeaderComponent } from '../../modules/main-header/main-header.component';
import { provideIcons } from '@ng-icons/core';
import { lucideMail } from '@ng-icons/lucide';
import { lucidePhone } from '@ng-icons/lucide';
import { lucideMapPin } from '@ng-icons/lucide';
import { YMapProps } from '@yandex/ymaps3-types';
import { PlaceAnOrder } from '../../modules/place-an-order/place-an-order.component';
import { MainCatalog } from '../../modules/main-catalog/main-catalog.component';
import { MainPrice } from '../../modules/main-price/main-price.component';
import { MainProduction } from '../../modules/main-production/main-production.component';
import { MainQuestions } from '../../modules/main-questions/main-questions.component';
import { MainWelcome } from '../../modules/main-welcome/main-welcome';
import { MainBannerForm } from '../../modules/main-banner-form/main-banner-form.component';
import { NgIconImports } from '@atlas/core';
import { markAsSubmit } from '@atlas/core';
import { finalize } from 'rxjs';
import { IFormData, injectSendMessage } from '../../modules/send-service/send.services';

export function ymOrderRequestEvent(): void {
  const { ym } = window as any;
  if (ym) {
    ym(108545164, 'reachGoal', 'draining-suspended-ceiling');
  }
}

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
    MainPrice,
    MainProduction,
    MainQuestions,
    NgIconImports,
    MainWelcome,
    MainBannerForm,
  ],
  providers: [
    provideIcons({
      lucideMapPin,
      lucidePhone,
      lucideMail,
    }),
  ],
  host: {
    id: 'main',
  },
})
export class MainPage {
  private readonly sendForm = injectSendMessage(ymOrderRequestEvent);

  protected readonly form = new FormGroup({
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    description: new FormControl(undefined, []),
    checked: new FormControl(undefined, [Validators.requiredTrue]),
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

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      this.sendForm(this.form.value as IFormData)
        .pipe(
          finalize(() => {
            this.form.setValue({} as any);
            this.form.markAsUntouched();
          })
        )
        .subscribe();
    }
  }
}
