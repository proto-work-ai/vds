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

@Directive({ selector: 'a[phoneContact],button[phoneContact]' })
export class PhoneContactDirective {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly elementRef: ElementRef<HTMLAnchorElement> = inject(ElementRef<HTMLAnchorElement>);
  public readonly phone = input.required<string>({ alias: 'phoneContact' });
  // private readonly viewContainerRef = inject(ViewContainerRef);

  constructor() {
    this.elementRef.nativeElement.classList.add('cursor-pointer');
  }

  @HostListener('click') onClick() {
    const node = document.createElement('a');
    node.setAttribute('href', `tel:+7${this.phone()}`);
    node.click();
  }

  //ngOnInit() {
  //const componentRef = this.viewContainerRef.createComponent(PhoneContactComponent);
  //componentRef.instance.phone = this.phone();
  // if (this.isBrowser) {
  //   setTimeout(() => {
  //     this.elementRef.nativeElement.setAttribute('href', `tel:+7${this.phone()}`);
  //   }, 200);
  // }
  //}
}

export const PhoneContact = [PhoneContactDirective] as const;
