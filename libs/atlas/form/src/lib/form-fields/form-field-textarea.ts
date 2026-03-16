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
import { AttributeControlPipe } from "../pipes/attribute-control.pipe";
import { FORM_META_ATTRIBUTE } from '../pipes/field-attribute-portal.pipe';
import { TuiFieldErrorPipe, TuiTextarea } from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'atlas-form-field-textfield',
  template: `
        <tui-textfield>
          <label tuiLabel>{{attribute.title}}</label>
          <textarea tuiTextarea [formControl]="attribute | metaAttributeControl"></textarea>
        </tui-textfield>
      <tui-error  [formControl]="attribute | metaAttributeControl" [error]="[] | tuiFieldError | async" />
    `,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TuiLabel,
    AttributeControlPipe,
    TuiTextfield,
    TuiTextfield,
    TuiTextarea,
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
    class: 'contents'
  }
})
export class FormFieldTextarea {
  protected readonly attribute = inject(FORM_META_ATTRIBUTE);
}
