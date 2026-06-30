import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiNumberFormatSettings, TuiTextfield } from '@taiga-ui/core';
import { TuiInputSlider } from '@taiga-ui/kit';
import { MainBannerFormComponent } from './main-banner-form/main-banner-form.component';
import { MainAdvantagesComponent } from '../main-advantages/main-advantages.component';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss'],
  imports: [FormsModule, TuiTextfield, TuiInputSlider, MainBannerFormComponent, MainAdvantagesComponent],
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
}
