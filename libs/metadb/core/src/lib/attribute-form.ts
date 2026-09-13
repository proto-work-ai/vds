import { InjectionToken } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { FieldTypeEnum, IQtFieldOption } from './base';
import { FileAccept } from './file';
import { SelectOptions } from './form';

export const FIELD_CONFIG_DATA = new InjectionToken('FIELD_CONFIG_DATA');

export interface IFieldTextConfig {
  type?: FieldTypeEnum.TEXTAREA | FieldTypeEnum.TEXT | FieldTypeEnum.NUMBER;
  options?: IQtFieldOption;
  placeholder?: string;
}

export interface IFieldCheckboxConfig {
  type?: FieldTypeEnum.CHECKBOX;
}

export interface IFieldImageConfig {
  type?: FieldTypeEnum.MEDIA;
  multiple?: boolean;
}

export interface IFieldFileConfig {
  type?: FieldTypeEnum.MEDIA;
  multiple?: boolean;
  accept?: FileAccept;
  placeholder?: string;
}

export interface IFieldRadioConfig {
  type?: FieldTypeEnum.RADIO;
  options?: SelectOptions;
}

export interface IFieldSelectConfig {
  type?: FieldTypeEnum.SELECT;
  options?: SelectOptions;
  multiple?: boolean;
  placeholder?: string;
}

export interface IFieldColorConfig {
  type?: FieldTypeEnum.COLOR;
}

export interface IFieldCustomConfig {
  type: FieldTypeEnum.CUSTOM;
  component: ComponentType<unknown>;
  data?: any;
}

export type FormField =
  | {
      type: FieldTypeEnum;
    }
  | IFieldCustomConfig
  | IFieldTextConfig
  | IFieldCheckboxConfig
  | IFieldImageConfig
  | IFieldFileConfig
  | IFieldRadioConfig
  | IFieldSelectConfig
  | IFieldColorConfig;
