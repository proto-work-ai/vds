import { Component, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiSelect, TuiTextfield } from '@taiga-ui/core';
import {
  TuiChevron,
  TuiDataListWrapper,
  TuiInputPhone,
  tuiInputPhoneOptionsProvider,
  TuiInputSlider,
} from '@taiga-ui/kit';

@Component({
  selector: 'app-application-measurement',
  templateUrl: './application-measurement.component.html',
  styleUrls: ['./application-measurement.component.scss'],
  imports: [
    TuiDataListWrapper,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfield,
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
export class ApplicationMeasurementComponent {
  readonly title = input('Оставьте заявку на бесплатный замер');

  protected readonly form = new FormGroup({
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
  });
}
