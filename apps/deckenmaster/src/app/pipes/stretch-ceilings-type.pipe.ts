import { Pipe, PipeTransform } from '@angular/core';
import { StretchCeilingsType } from '../model/stretch-ceilings.data';
import { stretchCeilingsTypeName } from '../model/stretch-ceilings.service';

@Pipe({ name: 'stretchCeilingsType' })
export class StretchCeilingsTypePipe implements PipeTransform {
  transform(type: StretchCeilingsType): string {
    return stretchCeilingsTypeName[type] ?? '';
  }
}
