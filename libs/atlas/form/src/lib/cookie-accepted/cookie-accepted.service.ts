import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  inject,
  Injectable,
  Injector,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { CookieAccepted } from './cookie-accepted';
import { injectLocalStorage } from '@atlas/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CookieAcceptedService implements OnDestroy {
  private componentRef?: ComponentRef<CookieAccepted>;
  private readonly injector = inject(Injector);
  private readonly applicationRef = inject(ApplicationRef);
  private readonly cookie = injectLocalStorage('cookie_accepted');

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && !this.cookie()) {
      this.createComponent();
    }
  }

  ngOnDestroy(): void {
    this.componentRef?.destroy();
  }

  private async createComponent(): Promise<void> {
    const { CookieAccepted } = await import('./cookie-accepted');

    const hostElement = document.createElement('div');
    document.body.append(hostElement);
    this.componentRef = createComponent(CookieAccepted, {
      hostElement,
      elementInjector: this.injector,
      environmentInjector: this.applicationRef.injector,
    });
    this.componentRef.instance.cookie = this.cookie;
    this.componentRef.changeDetectorRef.detectChanges();
  }
}
