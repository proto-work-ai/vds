import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiNumberFormatSettings, TuiTextfield } from '@taiga-ui/core';
import { TuiInputRange, TuiInputSlider } from '@taiga-ui/kit';
import { MainBannerFormComponent } from './main-banner-form/main-banner-form.component';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss'],
  imports: [FormsModule, TuiTextfield, TuiInputRange, TuiInputSlider, MainBannerFormComponent],
})
export class BannerComponent {
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
