import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield, TuiInput, TuiSlider } from '@taiga-ui/core';
import {
  TuiChevron,
  TuiDataListWrapper,
  TuiInputNumber,
  TuiInputPhone,
  TuiInputSlider,
  TuiSelect,
  TuiTextarea,
} from '@taiga-ui/kit';
import { IsPlatformBrowserDirective } from '../is-platform-browser.directive';
import { FormGroupStore } from '../form-store/form-store.directive';
import { RouterLink } from '@angular/router';

export { FormGroupStore };

export const FormImports = [
  TuiDataListWrapper,
  ReactiveFormsModule,
  FormsModule,
  TuiTextfield,
  TuiInputSlider,
  TuiInputPhone,
  TuiInput,
  IsPlatformBrowserDirective,
  FormGroupStore,
  TuiSelect,
  TuiChevron,
  TuiTextarea,
  TuiSlider,
  TuiInputNumber,
  RouterLink,
] as const;
