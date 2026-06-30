import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield, TuiInput, TuiSlider, TuiButton, TuiHint } from '@taiga-ui/core';
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
import { ZoomController } from '../../modules/price-calculation/zoom-controller/zoom-controller.component';
import { DataListOptions } from '../../modules/price-calculation/data-list-options/data-list-options.component';
import { DataListOption } from '../../modules/price-calculation/data-list-options/data-list-option.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

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
  ZoomController,
  DataListOptions,
  DataListOption,
  TuiSlider,
  TuiInputNumber,
  RouterLink,

  AsyncPipe,
  TuiButton,
  TuiHint,
] as const;
