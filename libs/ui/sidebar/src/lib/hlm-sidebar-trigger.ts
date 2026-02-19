/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @nx/enforce-module-boundaries */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  lucidePanelLeft,
  lucidePanelLeftClose,
  lucidePanelLeftOpen,
  lucidePanelRight,
} from '@ng-icons/lucide';
import { HlmButton, provideBrnButtonConfig } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmSidebarService } from './hlm-sidebar.service';

@Component({
  selector: 'button[hlmSidebarTrigger]',
  imports: [HlmIconImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      lucidePanelLeft,
      lucidePanelRight,
      lucidePanelLeftClose,
      lucidePanelLeftOpen,
    }),
    provideBrnButtonConfig({ variant: 'outline', size: 'icon' }),
  ],
  hostDirectives: [{ directive: HlmButton }],
  host: {
    'data-slot': 'sidebar-trigger',
    'data-sidebar': 'trigger',
    '(click)': '_onClick()',
  },
  template: `
    <ng-icon
      hlm
      size="sm"
      [name]="
        iconOnly()
          ? 'lucidePanelRight'
          : open()
            ? 'lucidePanelLeftClose'
            : 'lucidePanelLeftOpen'
      "
    ></ng-icon>
  `,
})
export class HlmSidebarTrigger {
  private readonly _hlmBtn = inject(HlmButton);
  private readonly _sidebarService = inject(HlmSidebarService);

  protected readonly open = this._sidebarService.open;

  public iconOnly = signal(true);

  constructor() {
    this._hlmBtn.setClass('size-7 text-gray-600');
  }

  protected _onClick(): void {
    this._sidebarService.toggleSidebar();
  }
}
