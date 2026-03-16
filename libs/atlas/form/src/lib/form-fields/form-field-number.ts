import { provideIcons } from '@ng-icons/core';
import {
  lucideLayersPlus,
  lucideMaximize,
  lucideMinimize,
  lucideRefreshCcw,
  lucideChevronDown,
} from '@ng-icons/lucide';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiError, TuiLabel, TuiTextfield } from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiInputNumber } from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';
import { AttributeControlPipe } from "../pipes/attribute-control.pipe";
import { FORM_META_ATTRIBUTE } from '../pipes/field-attribute-portal.pipe';

@Component({
  selector: 'atlas-form-field-number',
  template: `
        <tui-textfield>
          <label tuiLabel>{{attribute.title}}</label>      
          <input
              tuiInputNumber
              [formControl]="attribute | metaAttributeControl"
          />
        </tui-textfield>
      <tui-error  [formControl]="attribute | metaAttributeControl" [error]="[] | tuiFieldError | async" />
    `,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TuiLabel,
    TuiTextfield,
    TuiInputNumber,
    AttributeControlPipe,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
  ],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
      lucideRefreshCcw,
      lucideChevronDown,
      lucideLayersPlus,
    }),
  ],
  host:{
    class: 'contents'
  }
})
export class FormFieldNumber {
  protected readonly attribute = inject(FORM_META_ATTRIBUTE);
}
