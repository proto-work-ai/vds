import { inject, Pipe, PipeTransform } from '@angular/core';
import { MetaAttribute } from '@metadb/client';
import { FormControl, FormGroupDirective, Validators } from '@angular/forms';

@Pipe({ name: 'metaAttributeControl' })
export class AttributeControlPipe implements PipeTransform {
  private readonly formGroup = inject(FormGroupDirective);

  private get form() {
    return this.formGroup.form;
  }

  private addControl(attribute: MetaAttribute) {
    const control = new FormControl(undefined, this.getValidators(attribute));
    this.form.addControl(attribute.name, control);
    return control;
  }

  private getValidators(attribute: MetaAttribute) {
    const validators = [];
    if (attribute.required) {
      validators.push(Validators.required);
    }
    return validators;
  }

  transform(attr: MetaAttribute): FormControl {
    if (this.form.controls[attr.name]) {
      return this.form.controls[attr.name] as FormControl;
    }
    return this.addControl(attr);
  }
}
