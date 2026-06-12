import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiNumberFormatSettings, TuiTextfield } from '@taiga-ui/core';
import { TuiInputSlider } from '@taiga-ui/kit';
import { ScrollLink } from '../../components/scroll-link/scroll-link.directive';
import { NavMenu } from '../nav-menu/nav-menu';
import {
  ADDRESS,
  ADDRESS_LINK,
  EMAIL_CONTACT,
  MAX_CONTACT,
  PERIOD_CONTACT,
  PHONE_CONTACT,
  TELEGRAM_CONTACT,
} from '../../contacts';
import { PhoneFormatPipe } from '@atlas/core';
import { lucideMail, lucidePhone } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  imports: [FormsModule, TuiTextfield, NavMenu, TuiInputSlider, ScrollLink, PhoneFormatPipe, NgIcon],
  providers: [
    provideIcons({
      lucidePhone,
      lucideMail,
    }),
  ],
})
export class MainHeaderComponent {
  protected readonly telegramContact = inject(TELEGRAM_CONTACT);
  protected readonly maxContact = inject(MAX_CONTACT);
  protected readonly phoneContact = inject(PHONE_CONTACT);
  protected readonly periodContact = inject(PERIOD_CONTACT);
  protected readonly address = inject(ADDRESS);
  protected readonly addressLink = inject(ADDRESS_LINK);
  protected readonly emailContact = inject(EMAIL_CONTACT);
  protected value = '';

  protected readonly numberFormat: Partial<TuiNumberFormatSettings> = {
    precision: 2,
    decimalSeparator: ',',
    thousandSeparator: '.',
  };

  protected range = 10;
  protected readonly minRange = 1;
  protected readonly maxRange = 150;
  protected readonly ticksLabels = [this.minRange, 50, 75, 100, this.maxRange].map((a) => a + 'м²');

  protected readonly items = signal([
    { title: 'Бесплатный выезд замерщика', src: '/icons/banner-icon-1.svg' },
    { title: 'Экологично', src: '/icons/banner-icon-2.svg' },
    { title: 'Изготовление за 1 день, установка за 2 часа', src: '/icons/banner-icon-3.svg' },
    { title: '3 года гарантии на материалы', src: '/icons/banner-icon-4.svg' },
  ]);
}
