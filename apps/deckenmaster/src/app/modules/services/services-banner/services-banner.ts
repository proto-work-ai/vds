import { Component, signal } from '@angular/core';
import { TuiNumberFormatSettings } from '@taiga-ui/core';
import { ServicesForm } from '../services-form/services-form';
import { FormImports } from '../../../components/form';

@Component({
  selector: 'app-services-banner',
  templateUrl: './services-banner.html',
  styleUrls: ['./services-banner.scss'],
  imports: [
    ServicesForm,
    FormImports,
  ],
})
export class ServicesBanner {
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
