/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/component-selector */
import { Directive, inject, input, OnInit } from '@angular/core';
import { MenuDeferService } from './menu-defer-host.service';

@Directive({ selector: '[menuDefer],[menuTitle]' })
export class MenuDeferDirective implements OnInit {
  private readonly service = inject(MenuDeferService);
  readonly id = input.required<string>();
  readonly menuTitle = input.required<string>();

  ngOnInit(): void {
    if (!this.service.hasName(this.id())) {
      this.service.addItem({
        name: this.id(),
        title: this.menuTitle(),
      });
    }
  }
}
