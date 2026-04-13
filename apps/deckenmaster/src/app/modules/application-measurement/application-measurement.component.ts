import { Component, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiInputPhone, tuiInputPhoneOptionsProvider, TuiInputSlider } from '@taiga-ui/kit';
import { FormStore } from '../../components/form-store/form-store.directive';
import { markAsSubmit } from '@atlas/core';

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
    FormStore,
  ],
})
export class ApplicationMeasurementComponent {
  readonly title = input('Оставьте заявку на бесплатный замер');

  protected readonly form = new FormGroup({
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
  });

  protected formSubmit() {
    if (markAsSubmit(this.form)) {
      console.log('formSubmit', this.form.value);
      this.form.reset();
    }
  }
}
