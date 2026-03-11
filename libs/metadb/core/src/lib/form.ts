/* eslint-disable @typescript-eslint/no-empty-object-type */
import { EventEmitter } from '@angular/core';

export type OnClickCallback<T> = (
  instance: T
) => (false | void | {}) | Promise<false | void | {}>;

export class SelectOptionItem<T = string> {
  title?: string;
  value?: T;
  active?: boolean;
  multi?: boolean;
  icon?: string | [string, string];
  disabled?: boolean;
  data?: any;
  group?: string | { title: string; name: string };
  public onClick?:
    | EventEmitter<SelectOptionItem>
    | OnClickCallback<SelectOptionItem>;

  children?: SelectOptionItem<T>[];
}

export type SelectOptions<T = any> = SelectOptionItem<T>[];

export declare type FieldValue<T = string> = T | SelectOptionItem<T>;
