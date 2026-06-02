import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiCheckbox, TuiInput, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiInputPhone, TuiInputSlider, TuiSelect } from '@taiga-ui/kit';
import { markAsSubmit } from '@atlas/core';
import { finalize } from 'rxjs';
import { IFormData, injectSendMessage } from '../../send-service/send.services';
import { FormStore } from '../../../components/form-store/form-store.directive';
import { IsPlatformBrowserDirective } from '../../../components/is-platform-browser.directive';

export function ymDrainingEvent(): void {
  const { ym } = window as any;
  if (ym) {
    ym(108545164, 'reachGoal', 'draining-suspended-ceiling');
  }
}

@Component({
  selector: 'app-services-form',
  templateUrl: 'services-form.html',
  styleUrls: ['services-form.scss'],
  imports: [
    TuiDataListWrapper,
    TuiSelect,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfield,
    TuiInputSlider,
    TuiInputPhone,
    FormStore,
    TuiInput,
    TuiCheckbox,
    IsPlatformBrowserDirective
  ],
})
export class ServicesForm {
  private readonly sendForm = injectSendMessage(ymDrainingEvent);

  protected readonly form = new FormGroup({
    name: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(2)]),
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
  });

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      this.sendForm(this.form.value as IFormData)
        .pipe(
          finalize(() => {
            this.form.patchValue({
              name: null,
              phone: null,
            });
            this.form.markAsUntouched();
          })
        )
        .subscribe();
    }
  }
}
