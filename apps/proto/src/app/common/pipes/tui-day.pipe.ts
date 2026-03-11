import { Pipe, PipeTransform } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';

@Pipe({ name: 'asTuiDay' })
export class TuiNativeDateAsTuiDayPipe implements PipeTransform {
  transform(value: Date | number | null): TuiDay | null {
    return value ? this.fromControlValue(new Date(value)) : null;
  }

  private fromControlValue(controlValue: Date | null): TuiDay | null {
    return controlValue && TuiDay.fromLocalNativeDate(controlValue);
  }
}
