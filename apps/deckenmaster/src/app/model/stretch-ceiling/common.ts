import { ComponentType } from '@angular/cdk/portal';
import { ProductTag } from './product-types';

export interface IContentType {
  key: string;
  title: string;
  image: string;
  images: string[];
  brief: string;
  types: ProductTag[];
  detail: () => Promise<ComponentType<any>>;
}
