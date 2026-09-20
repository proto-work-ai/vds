import { NgTemplateOutlet } from '@angular/common';
import { Component, Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';

@Component({
  template: `
    @defer {
      <ng-container *ngTemplateOutlet="content"></ng-container>
    } @placeholder {
      <ng-container *ngTemplateOutlet="content"></ng-container>
    }
  `,
  imports: [NgTemplateOutlet],
})
export class DeferComponent {
  content!: TemplateRef<unknown>;
}

@Directive({ selector: 'ng-template[appDefer]' })
export class DeferDirective {
  constructor() {
    inject(ViewContainerRef).createComponent(DeferComponent).instance.content = inject(TemplateRef);
  }
}

export const DeferImports = [DeferDirective] as const;
