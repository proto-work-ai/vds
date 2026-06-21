import { Pipe, PipeTransform } from '@angular/core';
import { StretchCeilingsGroup, stretchCeilingsGroupName } from '../model/products.data';

@Pipe({ name: 'stretchCceilingsGroup' })
export class StretchCeilingsGroupPipe implements PipeTransform {
  transform(group: StretchCeilingsGroup): string {
    return stretchCeilingsGroupName[group] ?? '';
  }
}
