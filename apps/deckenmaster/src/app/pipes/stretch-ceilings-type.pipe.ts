import { Pipe, PipeTransform } from '@angular/core';
import { stretchCeilingName, ProductType } from '../model/products.data';

@Pipe({ name: 'stretchCeilingsType' })
export class StretchCeilingsTypePipe implements PipeTransform {
  transform(type: ProductType): string {
    return stretchCeilingName[type] ?? '';
  }
}
