import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaskitoOptions } from '@maskito/core';
import { TuiTextfield } from '@taiga-ui/core';
import {
  TuiChevron,
  TuiDataListWrapper,
  TuiInputPhone,
  tuiInputPhoneOptionsProvider,
  TuiInputRange,
  TuiInputSlider,
  TuiSelect,
} from '@taiga-ui/kit';
import { MaskitoDirective } from '@maskito/angular';

import { maskitoPhone } from '../phone-mask';

@Component({
  selector: 'app-main-banner-form',
  templateUrl: './main-banner-form.component.html',
  styleUrls: ['./main-banner-form.component.scss'],
  imports: [
    TuiChevron,
    TuiDataListWrapper,
    TuiSelect,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfield,
    TuiInputRange,
    MaskitoDirective,
    TuiInputSlider,
    TuiInputPhone,
  ],
  providers: [
    tuiInputPhoneOptionsProvider({
      valueTransformer: {
        fromControlValue: (value) => `+${value}`,
        toControlValue: (value) => value?.slice(1),
      },
    }),
  ],
})
export class MainBannerFormComponent {
  protected readonly typeOptions = signal(['Матовый', 'Тканевый', 'Глянцевый', 'Сатиновый']);
  protected readonly maskitoOptions = signal<MaskitoOptions>(maskitoPhone);

  protected range = 10;
  protected readonly minRange = 1;
  protected readonly maxRange = 150;
  protected readonly ticksLabels = [this.minRange, 50, 75, 100, this.maxRange].map((a) => a + 'м');

  protected readonly form = new FormGroup({
    type: new FormControl(''),
    size: new FormControl(1),
    phone: new FormControl(''),
  });
}
