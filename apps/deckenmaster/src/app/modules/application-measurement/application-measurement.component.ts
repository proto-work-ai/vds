import { Component, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiInputPhone, TuiInputSlider } from '@taiga-ui/kit';
import { FormStore } from '../../components/form-store/form-store.directive';
import { markAsSubmit } from '@atlas/core';
import { IFormData, injectSendFormData } from '../send-form-data/send.services';
import { tap } from 'rxjs';

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
  private readonly sendForm = injectSendFormData();
  readonly title = input('Оставьте заявку на бесплатный замер');

  protected readonly form = new FormGroup({
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
  });

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      this.sendForm(this.form.value as IFormData)
        .pipe(tap(() => this.form.reset()))
        .subscribe();
    }
  }
}
