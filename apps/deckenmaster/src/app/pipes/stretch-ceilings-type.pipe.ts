import { Pipe, PipeTransform } from '@angular/core';
import { stretchCeilingName, StretchCeilingsType } from '../model/stretch-ceilings.data';

@Pipe({ name: 'stretchCeilingsType' })
export class StretchCeilingsTypePipe implements PipeTransform {
  transform(type: StretchCeilingsType): string {
    return stretchCeilingName[type] ?? '';
  }
}
