import { Component, input, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiTextfield, TuiInput, TuiCheckbox } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiInputPhone, TuiInputSlider, TuiSelect } from '@taiga-ui/kit';
import { lucideCheckCircle } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { markAsSubmit } from '@atlas/core';
import { finalize } from 'rxjs';
import { IFormData, injectSendMessage, ymSubmitEvent } from '../send-service/send.services';
import { FormGroupStore } from '../../components/form-store/form-store.directive';
import { NgIconImports } from '../../components/ng-icon-src.directive';

@Component({
  selector: 'app-main-banner-form',
  templateUrl: './main-banner-form.component.html',
  styleUrls: ['./main-banner-form.component.scss'],
  imports: [
    TuiDataListWrapper,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfield,
    TuiInputSlider,
    TuiInputPhone,
    TuiCheckbox,
    FormGroupStore,
    TuiInput,
    TuiSelect,
    NgIconImports,
  ],
  providers: [
    provideIcons({
      lucideCheckCircle,
    }),
  ],
})
export class MainBannerForm {
  private readonly sendForm = injectSendMessage(ymSubmitEvent);

  protected readonly typeOptions = signal(['Звонок', 'Telegram', 'Max']);

  protected readonly form = new FormGroup({
    name: new FormControl(undefined, [Validators.required, Validators.minLength(1)]),
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    connectionType: new FormControl(this.typeOptions()[0], []),
    checked: new FormControl(false, [Validators.requiredTrue]),
  });

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      this.sendForm(this.form.value as IFormData)
        .pipe(
          finalize(() => {
            this.form.patchValue({} as any);
            this.form.markAsUntouched();
          })
        )
        .subscribe();
    }
  }
}
