import { Component, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { markAsSubmit } from '@atlas/core';
import { finalize } from 'rxjs';
import { IFormData, injectSendMessage } from '../../modules/send-service/send.services';
import { FormImports } from '../form';

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
  imports: [FormImports],
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
