import { Component, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiTextfield, TuiInput } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiInputPhone, TuiInputSlider } from '@taiga-ui/kit';
import { markAsSubmit } from '@atlas/core';
import { finalize, tap } from 'rxjs';
import { FormStore } from '../../components/form-store/form-store.directive';
import { IFormData, injectSendMessage } from '../../modules/send-service/send.services';
import { IsPlatformBrowserDirective } from '../is-platform-browser.directive';

export function ymAnyQuestions(): void {
  const { ym } = window as any;
  if (ym) {
    ym(108545164, 'reachGoal', 'any-questions');
  }
}

@Component({
  selector: 'app-any-questions',
  templateUrl: 'any-questions.html',
  styleUrls: ['any-questions.scss'],
  imports: [
    TuiDataListWrapper,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfield,
    TuiInputSlider,
    TuiInputPhone,
    FormStore,
    TuiInput,
    IsPlatformBrowserDirective
  ],
})
export class AnyQuestions {
  private readonly sendForm = injectSendMessage(ymAnyQuestions);
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
