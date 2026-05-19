import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { markAsSubmit } from '@atlas/core';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiButton, type TuiDialogContext, TuiTextfield, TuiTextfieldComponent } from '@taiga-ui/core';
import { TuiInputPhone } from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';
import { injectContext } from '@taiga-ui/polymorpheus';
import { IFormData, injectSendMessage } from './send.services';
import { tap } from 'rxjs';

@Component({
  templateUrl: 'send.modal.html',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiForm,
    TuiTextfieldComponent,
    FormsModule,
    TuiTextfield,
    TuiInputPhone,
    TuiAutoFocus,
  ],
})
export class SendModal {
  protected readonly context = injectContext<TuiDialogContext<IFormData | undefined, undefined>>();

  protected readonly form = new FormGroup({
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
  });

  protected formCancel(): void {
    this.context.completeWith(undefined);
  }

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      this.context.completeWith(this.form.value as IFormData);
    }
  }
}
