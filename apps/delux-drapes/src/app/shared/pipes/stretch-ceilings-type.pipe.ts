import { Pipe, PipeTransform } from '@angular/core';
import { productName, ProductType } from '../model/products.data';

@Pipe({ name: 'stretchCeilingsType' })
export class StretchCeilingsTypePipe implements PipeTransform {
  transform(type: ProductType): string {
    return productName[type] ?? '';
  }
}
