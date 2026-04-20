export interface IAppMenuItem {
  title: string;
  link?: string | string[];
  queryParams?: Record<string, string | number>;
  description?: string;
  children?: IAppMenuItem[];
}
