/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/component-selector */
import { Directive, inject, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({ selector: '[isPlatformBrowser]' })
export class IsPlatformBrowserDirective {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly containerRef = inject(ViewContainerRef);

  private get isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  constructor() {
    if (!this.isPlatformBrowser) {
      this.containerRef.clear();
    }
  }
}
