import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiIcon, TuiNumberFormatSettings, TuiTextfield } from '@taiga-ui/core';
import { TuiNumberFormat } from '@taiga-ui/core';
import { TuiInputRange, TuiInputSlider, TuiTooltip } from '@taiga-ui/kit';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss'],
  imports: [FormsModule, TuiIcon, TuiTextfield, TuiInputRange, TuiTooltip, TuiInputSlider],
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
  protected readonly ticksLabels = [this.minRange, 50, 75, 100, this.maxRange].map((a) => a + 'м');
}
