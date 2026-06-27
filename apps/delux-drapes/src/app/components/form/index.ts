import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield, TuiInput, TuiSlider, TuiCheckbox } from '@taiga-ui/core';
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
import { AtlasFormImports } from '@atlas/form';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { NgIconImports } from '../ng-icon-src.directive';

export { FormGroupStore };

export const FormImports = [
  TuiDataListWrapper,
  ReactiveFormsModule,
  FormsModule,
  TuiTextfield,
  TuiInputSlider,
  TuiInputPhone,
  TuiInput,
  TuiSelect,
  TuiChevron,
  TuiTextarea,
  TuiSlider,
  TuiInputNumber,
  RouterLink,
  TuiAutoFocus,
  TuiCheckbox,
  NgIconImports,
  FormGroupStore,
  AtlasFormImports,
  IsPlatformBrowserDirective,
] as const;
