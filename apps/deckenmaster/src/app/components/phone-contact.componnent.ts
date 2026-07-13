import { isPlatformBrowser } from '@angular/common';
import { inject, input, Component, Directive, ElementRef, HostListener, PLATFORM_ID } from '@angular/core';
import { PhoneFormatPipe } from '@atlas/core';

@Component({
  template: `<a class="max-sm:text-sm" href="tel:+7{{ phone }}">{{ phone | phoneFormat }}</a>`,
  imports: [PhoneFormatPipe],
})
export class PhoneContactComponent {
  public phone!: string;
}

// @Directive({ selector: 'a[phoneContact],button[phoneContact]' })
// export class PhoneContactDirective {
//   private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
//   private readonly elementRef: ElementRef<HTMLAnchorElement> = inject(ElementRef<HTMLAnchorElement>);
//   public readonly phone = input.required<string>({ alias: 'phoneContact' });
//   // private readonly viewContainerRef = inject(ViewContainerRef);

//   constructor() {
//     this.elementRef.nativeElement.classList.add('cursor-pointer');
//   }

//   @HostListener('click') onClick() {
//     const node = document.createElement('a');
//     node.setAttribute('href', `tel:+7${this.phone()}`);
//     node.click();
//   }
// }

@Directive({ selector: 'a[hrefContact],button[hrefContact]' })
export class HrefContactDirective {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly elementRef: ElementRef<HTMLAnchorElement> = inject(ElementRef<HTMLAnchorElement>);
  public readonly href = input.required<string>({ alias: 'hrefContact' });

  constructor() {
    this.elementRef.nativeElement.classList.add('cursor-pointer');
  }

  @HostListener('click') onClick() {
    const node = document.createElement('a');
    node.setAttribute('href', this.href());
    node.click();
  }
}

export const HrefContact = [HrefContactDirective] as const;
