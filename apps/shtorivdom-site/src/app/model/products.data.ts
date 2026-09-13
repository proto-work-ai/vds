import { ComponentType } from '@angular/cdk/portal';

// Страница каталога: вид штор, карнизов или жалюзи.
export interface IContentType {
  key: string;
  title: string;
  image: string;
  images: string[];
  text: string;
  detail: () => Promise<ComponentType<unknown>>;
  children?: Partial<IContentType>[];
}
