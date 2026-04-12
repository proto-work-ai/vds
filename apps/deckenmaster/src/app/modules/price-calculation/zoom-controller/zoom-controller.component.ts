import { AsyncPipe } from '@angular/common';
import { Component, forwardRef, input, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TUI_FALSE_HANDLER, tuiClamp } from '@taiga-ui/cdk';
import { TuiButton, TuiHint, TuiTextfield } from '@taiga-ui/core';
import { TuiInputNumber, TuiSlider } from '@taiga-ui/kit';
import { BehaviorSubject, distinctUntilChanged, map, of, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-zoom-controller',
  templateUrl: 'zoom-controller.component.html',
  styleUrl: 'zoom-controller.component.scss',
  imports: [AsyncPipe, FormsModule, TuiButton, TuiHint, TuiSlider, FormsModule, TuiInputNumber, TuiTextfield],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZoomControllerComponent),
      multi: true,
    },
  ],
})
export class ZoomControllerComponent implements ControlValueAccessor {
  readonly step = input(1);
  readonly min = input(1);
  readonly max = input(150);
  protected value = 1;
  protected disabled = signal(false);

  protected readonly active$ = new BehaviorSubject(false);
  protected readonly showHint$ = this.active$.pipe(
    distinctUntilChanged(),
    switchMap((active) => (active ? of(true) : timer(1000).pipe(map(TUI_FALSE_HANDLER))))
  );

  protected onKeydown(show: boolean): void {
    this.active$.next(show);
  }

  protected change(step: number): void {
    this.setValue(tuiClamp(this.value + step, this.min(), this.max()));
  }

  protected propagateChange: (value: any) => void = () => {};
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
    this.value = value;
    if (propagateChange) {
      this.propagateChange(this.value);
    }
  }
}
