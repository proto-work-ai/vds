import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { markAsSubmit } from '@atlas/core';
import {
  TuiButton,
  type TuiDialogContext,
  TuiTextfield,
  TuiTextfieldComponent,
  TuiInput,
  TuiCheckbox,
} from '@taiga-ui/core';
import { TuiInputPhone } from '@taiga-ui/kit';
import { injectContext } from '@taiga-ui/polymorpheus';
import { IFormData } from './send.services';
import { FormImports } from '../../components/form';

@Component({
  templateUrl: 'send.modal.html',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiTextfieldComponent,
    FormsModule,
    TuiTextfield,
    TuiInputPhone,
    TuiInput,
    TuiCheckbox,
    FormImports,
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
