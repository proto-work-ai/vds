import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Directive,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { PhoneFormatPipe } from '@atlas/core';

@Component({
  template: `<a class="max-sm:text-sm" href="tel:+7{{ phone }}">{{ phone | phoneFormat }}</a>`,
  imports: [PhoneFormatPipe],
})
export class PhoneContactComponent {
  public phone!: string;

  ngOnInit() {
    setTimeout(() => {}, 2_000);
  }
}

@Directive({ selector: 'a[phoneContact]' })
export class PhoneContactDirective {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly elementRef: ElementRef<HTMLAnchorElement> = inject(ElementRef<HTMLAnchorElement>);
  public readonly phone = input.required<string>({ alias: 'phoneContact' });

  ngOnInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.elementRef.nativeElement.setAttribute('href', `tel:+7${this.phone()}`);
      }, 200);
    }
  }
}

export const PhoneContact = [PhoneContactDirective] as const;
