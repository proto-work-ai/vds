import { Pipe, PipeTransform } from '@angular/core';
import { stretchCeilingsGroupName } from '../model/stretch-ceilings.service';
import { StretchCeilingsGroup } from '../model/stretch-ceilings.data';

@Pipe({ name: 'stretchCceilingsGroup' })
export class StretchCeilingsGroupPipe implements PipeTransform {
  transform(group: StretchCeilingsGroup): string {
    return stretchCeilingsGroupName[group] ?? '';
  }
}
