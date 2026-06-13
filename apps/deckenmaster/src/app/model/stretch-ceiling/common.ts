import { ComponentType } from '@angular/cdk/portal';
import { ProductType } from './product-types';

export interface IContentType {
  key: string;
  title: string;
  image: string;
  images: string[];
  brief: string;
  types: ProductType[];
  detail: () => Promise<ComponentType<any>>;
}
