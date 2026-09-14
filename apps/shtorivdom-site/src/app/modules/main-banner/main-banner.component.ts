import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiNumberFormatSettings, TuiTextfield } from '@taiga-ui/core';
import { TuiInputSlider } from '@taiga-ui/kit';
import { provideIcons } from '@ng-icons/core';
import { lucideCheckCircle } from '@ng-icons/lucide';
import { NgIconImports } from '@atlas/core';
import { InviteModalClick } from '../../components/invite-designer/invite-designer-modal';
import { NgxParallax } from '../../components/parallax.directive';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss'],
  imports: [FormsModule, TuiTextfield, NgIconImports, TuiInputSlider, InviteModalClick, NgxParallax],
  providers: [
    provideIcons({
      lucideCheckCircle,
    }),
  ],
})
export class MainBannerComponent {
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
    { title: 'Изготовление за 10–14 дней, установка за 2 часа', src: '/icons/banner-icon-3.svg' },
    { title: '2 года гарантии на материалы', src: '/icons/banner-icon-4.svg' },
  ]);
}
