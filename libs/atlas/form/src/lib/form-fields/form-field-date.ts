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
import { TuiFieldErrorPipe, TuiInputDate } from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';
import { AttributeControlPipe } from '../pipes/attribute-control.pipe';
import { FORM_META_ATTRIBUTE } from '../pipes/field-attribute-portal.pipe';

@Component({
  selector: 'atlas-form-field-date',
  template: `
    <tui-textfield>
      <label tuiLabel>{{ attribute.title }}</label>
      <input tuiInputDate [formControl]="attribute | metaAttributeControl" />
      <tui-calendar *tuiTextfieldDropdown />
    </tui-textfield>
    <tui-error [formControl]="attribute | metaAttributeControl" [error]="[] | tuiFieldError | async" />
  `,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TuiLabel,
    TuiInputDate,
    TuiTextfield,
    AttributeControlPipe,
    TuiFieldErrorPipe,
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
  host: {
    class: 'contents',
  },
})
export class FormFieldDate {
  protected readonly attribute = inject(FORM_META_ATTRIBUTE);
}
