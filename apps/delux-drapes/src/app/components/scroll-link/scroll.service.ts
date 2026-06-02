import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly document = inject(DOCUMENT);

  scrollToElement(element: Element | null): void {
    element?.scrollIntoView({ behavior: 'smooth' });
  }
  scrollToElementBy(selector: string): void {
    if (typeof selector !== 'string' || selector.length < 1) {
      return;
    }
    setTimeout(() => {
      const element = this.document.querySelector(selector)!;
      if (element) {
        this.scrollToElement(element);
      } else {
        setTimeout(() => {
          this.scrollToElement(this.document.querySelector(selector)!);
        }, 1000);
      }
    });
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
