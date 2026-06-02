import { Injectable, Signal, signal } from '@angular/core';

export interface MenuItem {
  name: string;
  title: string;
  hash?: string;
}

@Injectable({ providedIn: 'root' })
export class MenuDeferService {
  #items = signal<MenuItem[]>([]);

  get items(): Signal<MenuItem[]> {
    return this.#items.asReadonly();
  }

  hasName(name: string): boolean {
    return this.#items().some((a) => a.name === name);
  }

  addItem(item: MenuItem): void {
    this.#items.update((a) => a.concat(item));
  }
}
