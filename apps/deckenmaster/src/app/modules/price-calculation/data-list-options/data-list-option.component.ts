/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, HostListener, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { DataListOptionsComponent } from './data-list-options.component';

@Component({
  selector: 'data-list-option',
  templateUrl: 'data-list-option.component.html',
  styleUrl: 'data-list-option.component.scss',
  imports: [FormsModule, NgIcon],
})
export class DataListOptionComponent {
  private readonly parent = inject(DataListOptionsComponent);
  readonly icon = input<string | undefined>(undefined);
  readonly value = input<unknown>(undefined);

  protected readonly selected = computed(() => {
    const value = this.value();
    const items = this.parent?.value();
    if (Array.isArray(items)) {
      return items.includes(value);
    } else {
      return false;
    }
  });

  @HostListener('click') onSelectedItem(): void {
    const values = this.parent?.value()?.concat() ?? [];
    const value = this.value();
    if (values.includes(value)) {
      values.splice(values.indexOf(value), 1);
    } else {
      values.push(value);
    }
    this.parent?.setValue(values);
  }
}
