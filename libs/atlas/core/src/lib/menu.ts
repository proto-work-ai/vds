export interface IMenuItem {
  title: string;
  link?: string;
  icon?: string;
  iconClass?: string;
  isActive?: boolean;
  items?: IMenuItem[],
  onClick?: (row: any) => void;
}
