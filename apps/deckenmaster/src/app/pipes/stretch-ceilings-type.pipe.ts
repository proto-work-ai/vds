import { Pipe, PipeTransform } from '@angular/core';
import { productTypeName, ProductType } from '../model/stretch-ceiling';

@Pipe({ name: 'stretchCeilingsType' })
export class StretchCeilingsTypePipe implements PipeTransform {
  transform(type: ProductType): string {
    return productTypeName[type] ?? '';
  }
}
