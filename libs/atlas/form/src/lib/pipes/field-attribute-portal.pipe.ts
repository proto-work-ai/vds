/* eslint-disable @nx/enforce-module-boundaries */
import { PipeTransform, inject, Pipe, ViewContainerRef, Injector, InjectionToken, ValueProvider } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { MetaAttribute } from '@prisma/client';
import { ATTRIBUTE_UPDATED_AT, ATTRIBUTE_CREATED_AT, ATTRIBUTE_DATE, ATTRIBUTE_DATETIME, ATTRIBUTE_TEXTAREA, ATTRIBUTE_BOOLEAN, ATTRIBUTE_STRING, ATTRIBUTE_RICHTEXT, ATTRIBUTE_YEAR, ATTRIBUTE_TIME, ATTRIBUTE_TINYINT, ATTRIBUTE_SMALLINT, ATTRIBUTE_INT, ATTRIBUTE_BIGINT, ATTRIBUTE_NUMBER } from '@metadb/core';
import { FormFieldChecked } from '../form-fields/form-field-checked';
import { FormFieldTextfield } from '../form-fields/form-field-textfield';
import { FormFieldDate } from '../form-fields/form-field-date';
import { FormFieldNumber } from '../form-fields/form-field-number';
import { FormFieldTextarea } from '../form-fields/form-field-textarea';

export const FORM_META_ATTRIBUTE = new InjectionToken<MetaAttribute>('FORM_META_ATTRIBUTE');
export function formMetaAttributeProvider(value: unknown): ValueProvider {
  return {
    provide: FORM_META_ATTRIBUTE,
    useValue: value
  };
}

export const FORM_DATA = new InjectionToken<MetaAttribute>('FORM_DATA');
export function formDataProvider(value: unknown): ValueProvider {
  return {
    provide: FORM_DATA,
    useValue: value
  };
}

@Pipe({ name: 'fieldAttributePortal' })
export class FieldAttributePortalPipe<T = unknown> implements PipeTransform {
  private readonly injector = inject(Injector);
  private readonly viewContainerRef = inject(ViewContainerRef);

  transform(attr: MetaAttribute, model: unknown) {
    switch (attr.type) {
      case ATTRIBUTE_BOOLEAN:
        return new ComponentPortal(FormFieldChecked, this.viewContainerRef, this.createIngector(attr, model));
      case ATTRIBUTE_RICHTEXT:
      case ATTRIBUTE_TEXTAREA:
        return new ComponentPortal(FormFieldTextarea, this.viewContainerRef, this.createIngector(attr, model));
      case ATTRIBUTE_STRING:
        return new ComponentPortal(FormFieldTextfield, this.viewContainerRef, this.createIngector(attr, model));
      case ATTRIBUTE_DATE:
      case ATTRIBUTE_DATETIME:
      case ATTRIBUTE_UPDATED_AT:
      case ATTRIBUTE_CREATED_AT:
      case ATTRIBUTE_YEAR:
      case ATTRIBUTE_TIME:
        return new ComponentPortal(FormFieldDate, this.viewContainerRef, this.createIngector(attr, model));
      case ATTRIBUTE_TINYINT:
      case ATTRIBUTE_SMALLINT:
      case ATTRIBUTE_INT:
      case ATTRIBUTE_BIGINT:
      case ATTRIBUTE_NUMBER:
        return new ComponentPortal(FormFieldNumber, this.viewContainerRef, this.createIngector(attr, model));
      default:
        return undefined;
    }
  }

  private createIngector(attr: MetaAttribute, model: unknown): Injector {
    return Injector.create({
      parent: this.injector, providers: [
        formMetaAttributeProvider(attr),
        formDataProvider(model),
      ]
    })
  }
}