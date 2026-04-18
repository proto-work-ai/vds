export interface IAppMenuItem {
  title: string;
  link?: string | string[];
  queryParams?: Record<string, string | number>;
  group?: boolean;
  description?: string;
  children?: IAppMenuItem[];
}
