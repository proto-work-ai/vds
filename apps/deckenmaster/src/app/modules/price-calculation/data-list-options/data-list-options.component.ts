/* eslint-disable @angular-eslint/component-selector */
import { Component, forwardRef, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'data-list-options',
  template: '<ng-content></ng-content>',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DataListOptions),
      multi: true,
    },
  ],
})
export class DataListOptions implements ControlValueAccessor {
  readonly items = input<any>([]);

  readonly value = signal<any[]>([]);;
  protected disabled = signal(false);

  protected propagateChange(value: any) {}

  protected propagateTouched() {}

  writeValue(value: any): void {
    this.setValue(value, false);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  setValue(value: any, propagateChange = true): void {
    this.value.set(value);
    if (propagateChange) {
      this.propagateChange(this.value());
    }
  }
}