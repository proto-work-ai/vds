import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield, TuiInput } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiInputPhone, TuiInputSlider, TuiSelect, TuiTextarea } from '@taiga-ui/kit';
import { IsPlatformBrowserDirective } from '../is-platform-browser.directive';
import { FormGroupStore } from '../form-store/form-store.directive';

export { FormGroupStore };

export const FormImports = [
  TuiDataListWrapper,
  ReactiveFormsModule,
  TuiTextfield,
  TuiInputSlider,
  TuiInputPhone,
  TuiInput,
  IsPlatformBrowserDirective,
  FormGroupStore,
  TuiSelect,
  FormsModule,
  TuiChevron,
  TuiTextarea,
] as const;
