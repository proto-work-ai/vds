export interface IMenuItem {
  title: string;
  url: string;
  icon?: string;
  isActive?: boolean;
  items?: IMenuItem[]
}
