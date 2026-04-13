/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/component-selector */
import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { injectScrollToElement } from './scroll.service';

@Directive({ selector: 'a[href]' })
export class ScrollLink {
  private readonly scrollElementTo = injectScrollToElement();
  private readonly slementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

  @HostListener('click', ['$event']) onClick($event: Event) {
    const link = this.slementRef.nativeElement.getAttribute('href');
    if (link && link?.charAt(0) === '#') {
      $event.stopPropagation();
      $event.preventDefault();
      this.scrollElementTo(link);
    }
  }
}
