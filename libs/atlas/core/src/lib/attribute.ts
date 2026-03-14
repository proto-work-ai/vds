import { ComponentType } from "@angular/cdk/portal";
import { ElementRef, TemplateRef } from "@angular/core";

interface IMetaAttributeBase<T = unknown> {
  title: string | ComponentType<unknown>,
  key: (keyof T extends symbol ? never : string) | string,
  width?: string,
  cellContent?: unknown;
  cellContentContext?: unknown;
}

export interface IMetaAttribute<T> extends IMetaAttributeBase<T> {
  type: 'number' | 'string' | 'boolean' | 'date' | string;
}

export interface IMetaAttributeContextComponent<T> extends IMetaAttributeBase<T> {
  type: 'component';
  cellContent?: ComponentType<unknown>;
  cellContentContext?: unknown
}

export interface IMetaAttributeContextTemplate<T> extends IMetaAttributeBase<T> {
  type: 'template';
  cellContent?: TemplateRef<unknown>;
  cellContentContext?: unknown;
}

export interface IMetaAttributeContextElement<T> extends IMetaAttributeBase<T> {
  type: 'element';
  cellContent?: ElementRef<HTMLElement>;
  cellContentContext?: unknown
}

export type ColumnAttributeTable<T = any> = IMetaAttribute<T> | IMetaAttributeContextComponent<T> | IMetaAttributeContextTemplate<T> | IMetaAttributeContextElement<T>;