import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { markAsSubmit } from '@atlas/core';
import { IFormData, injectSendMessage, ymSubmitEvent } from '../../send-service/send.services';
import { finalize } from 'rxjs';
import { FormImports } from '../../../components/form';

@Component({
  selector: 'app-main-banner-form',
  templateUrl: './main-banner-form.component.html',
  styleUrls: ['./main-banner-form.component.scss'],
  imports: [FormImports],
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
