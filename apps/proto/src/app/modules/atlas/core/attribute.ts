import { ComponentType } from "@angular/cdk/portal";
import { ElementRef, TemplateRef } from "@angular/core";

interface IMetaAttributeBase {
  title: string | ComponentType<unknown>,
  key: string,
  width?: string,
  cellContent?: unknown;
  cellContentContext?: unknown;
}

export interface IMetaAttribute extends IMetaAttributeBase {
  type: 'number' | 'string' | 'boolean' | 'date';
}

export interface IMetaAttributeContextComponent extends IMetaAttributeBase {
  type: 'component';
  cellContent?: ComponentType<unknown>;
  cellContentContext?: unknown
}

export interface IMetaAttributeContextTemplate extends IMetaAttributeBase {
  type: 'template';
  cellContent?: TemplateRef<unknown>;
  cellContentContext?: unknown;
}

export interface IMetaAttributeContextElement extends IMetaAttributeBase {
  type: 'element';
  cellContent?: ElementRef<HTMLElement>;
  cellContentContext?: unknown
}

export type MetaAttribute = IMetaAttribute | IMetaAttributeContextComponent | IMetaAttributeContextTemplate | IMetaAttributeContextElement;