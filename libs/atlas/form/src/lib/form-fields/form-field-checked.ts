/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */
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
import { TuiCheckbox, TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiError, TuiLabel } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';
import { AttributeControlPipe } from 'libs/atlas/form/src/lib/pipes/attribute-control.pipe';
import { FORM_META_ATTRIBUTE } from '../pipes/field-attribute-portal.pipe';

@Component({
  selector: 'atlas-form-field-checked',
  template: `
    <label tuiLabel class="flex items-center">
      <input tuiCheckbox type="checkbox" size="m" [formControl]="attribute | metaAttributeControl" />
      {{ attribute.title }}
    </label>
    <tui-error [formControl]="attribute | metaAttributeControl" [error]="[] | tuiFieldError | async" />
  `,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiCheckbox,
    TuiLabel,
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
  host: {
    class: 'contents',
  },
})
export class FormFieldChecked {
  protected readonly attribute = inject(FORM_META_ATTRIBUTE);
}
