import { Pipe, PipeTransform } from '@angular/core';
import { productTypeName, ProductTag } from '../model/stretch-ceiling';

@Pipe({ name: 'stretchCeilingsType' })
export class StretchCeilingsTypePipe implements PipeTransform {
  transform(type: ProductTag): string {
    return productTypeName[type] ?? '';
  }
}
