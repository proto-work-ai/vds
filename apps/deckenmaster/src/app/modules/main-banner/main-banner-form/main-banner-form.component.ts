import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiInputPhone, TuiInputRange, TuiInputSlider, TuiSelect } from '@taiga-ui/kit';
import { markAsSubmit } from '@atlas/core';
import { type EmailJSResponseStatus } from '@emailjs/browser';
import { FormStore } from '../../../components/form-store/form-store.directive';
import { IFormData, injectSendMessage, ymSubmitEvent } from '../../send-service/send.services';
import { finalize, tap } from 'rxjs';

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
    TuiInputSlider,
    TuiInputPhone,
    FormStore,
  ],
})
export class MainBannerFormComponent {
  private readonly sendForm = injectSendMessage(ymSubmitEvent);
  protected readonly typeOptions = signal(['Матовый', 'Тканевый', 'Глянцевый', 'Сатиновый']);

  protected readonly minRange = signal(5);
  protected readonly maxRange = signal(150);
  protected readonly ticksLabels = signal([this.minRange(), 50, 75, 100, this.maxRange()].map((a) => a + 'м²'));

  protected readonly form = new FormGroup({
    type: new FormControl(this.typeOptions()[0]),
    size: new FormControl(this.minRange()),
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
  });

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      this.sendForm(this.form.value as IFormData)
        .pipe(
          finalize(() => {
            this.form.setValue({
              type: this.typeOptions()[0],
              size: this.minRange(),
              phone: null,
            });
            this.form.markAsUntouched();
          })
        )
        .subscribe();
    }
  }
}
