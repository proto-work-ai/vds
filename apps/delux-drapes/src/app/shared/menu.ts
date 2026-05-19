export interface IAppMenuItem {
  title: string;
  link?: string | string[];
  queryParams?: Record<string, string | number>;
  fragment?: string;
  description?: string;
  children?: IAppMenuItem[];
}
