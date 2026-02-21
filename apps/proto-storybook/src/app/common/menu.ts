export interface IMenuItem {
  title: string;
  link: string;
  icon?: string;
  isActive?: boolean;
  items?: IMenuItem[]
}
