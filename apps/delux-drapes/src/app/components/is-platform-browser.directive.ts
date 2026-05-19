/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/component-selector */
import { Directive, inject, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({ selector: '[isPlatformBrowser]' })
export class IsPlatformBrowserDirective {
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      inject(ViewContainerRef).createEmbeddedView(inject(TemplateRef));
    } else {
      inject(ViewContainerRef).clear();
    }
  }
}
