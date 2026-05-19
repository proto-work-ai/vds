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
    return this.match(this.value(), this.parent?.value());
  });

  @HostListener('click') onSelectedItem(): void {
    const values = this.parent?.value()?.concat() ?? [];
    const value = this.value();
    if (this.match(value, values)) {
      values.splice(values.indexOf(value), 1);
    } else {
      values.push(value);
    }
    this.parent?.setValue(values);
  }

  private match(value: unknown, items: unknown[]): boolean {
    if (!Array.isArray(items)) {
      return false;
    }
    if (items.includes(value)) {
      return true;
    }
    if (value != null && typeof value === 'object' && Object.hasOwn(value, 'id')) {
      return items.some((a: any) => a.id === (value as any).id);
    }
    return false;
  }
}
