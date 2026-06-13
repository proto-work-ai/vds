import { Component, input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { markAsSubmit } from '@atlas/core';
import { IFormData, injectSendMessage, ymSubmitEvent } from '../send-service/send.services';
import { finalize } from 'rxjs';
import { FormImports } from '../../components/form';

@Component({
  selector: 'app-application-measurement',
  templateUrl: './application-measurement.component.html',
  styleUrls: ['./application-measurement.component.scss'],
  imports: [FormImports],
})
export class ApplicationMeasurementComponent {
  private readonly sendForm = injectSendMessage(ymSubmitEvent);
  readonly title = input('Оставьте заявку на бесплатный замер');

  protected readonly form = new FormGroup({
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
  });

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      this.sendForm(this.form.value as IFormData)
        .pipe(
          finalize(() => {
            this.form.patchValue({
              phone: null,
            });
            this.form.markAsUntouched();
          })
        )
        .subscribe();
    }
  }
}
