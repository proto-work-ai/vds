import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly document = inject(DOCUMENT);

  scrollToElement(element: HTMLElement | null): void {
    element?.scrollIntoView({ behavior: 'smooth' });
  }
  scrollToElementBy(selector: string): void {
    this.scrollToElement(this.document.querySelector(selector));
  }

  scrollToElementById(id: string): void {
    this.scrollToElement(this.document.getElementById(id));
  }
}

export function injectScrollToElement() {
  const scroll = inject(ScrollService);
  return (selector: string | undefined) => {
    if (selector) {
      return scroll.scrollToElementBy(selector);
    }
  };
}
