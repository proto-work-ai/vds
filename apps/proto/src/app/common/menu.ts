import { Signal, WritableSignal } from '@angular/core';

export interface ISignalMenuItem {
  title: string;
  link: string;
  icon?: string;
  children?: Signal<ISignalMenuItem[]>;
  active?: WritableSignal<boolean>;
}
