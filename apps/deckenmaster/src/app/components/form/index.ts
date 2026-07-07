import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInput, TuiSlider, TuiButton, TuiHint, TuiDropdown, TuiNumberFormat, TuiCheckbox } from '@taiga-ui/core';

import { TuiDataListWrapper, TuiInputNumber, TuiInputPhone, TuiInputSlider, TuiTextarea } from '@taiga-ui/kit';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { TuiDataList, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiSelect } from '@taiga-ui/kit';
import { IsPlatformBrowserDirective } from '../is-platform-browser.directive';
import { FormGroupStore } from '../form-store/form-store.directive';
import { ZoomController } from '../../modules/price-calculation/zoom-controller/zoom-controller.component';
import { DataListOptions } from '../../modules/price-calculation/data-list-options/data-list-options.component';
import { DataListOption } from '../../modules/price-calculation/data-list-options/data-list-option.component';
import { DeferImports } from '../defer.component';
import { StringTextfieldImports } from '../stringify-setter.pipe';
import { NgIcon } from '@ng-icons/core';

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

  TuiDropdown,
  TuiNumberFormat,
  TuiDataList,
  DeferImports,
  StringTextfieldImports,
  TuiCheckbox,
  NgIcon,
] as const;
