import { Component, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePhone, lucideMenu, lucideX } from '@ng-icons/lucide';
import { TuiDataList, TuiDropdown, TuiPopup, TuiTitle } from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';
import { TuiHeader } from '@taiga-ui/layout';
import { MenuDeferService } from '../../components/menu-defer/menu-defer-host.service';
import { ScrollLink } from '../../components/scroll-link/scroll-link.directive';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
  imports: [
    NgIcon,
    TuiDataList,
    TuiDropdown,
    TuiDataList,
    TuiDropdown,
    TuiDrawer,
    TuiPopup,
    TuiTitle,
    TuiHeader,
    ScrollLink,
  ],
  providers: [
    provideIcons({
      lucidePhone,
      lucideMenu,
      lucideX,
    }),
  ],
})
export class MenuHeaderComponent {
  protected readonly items = inject(MenuDeferService).items;

  protected open = signal(false);

  protected onClose(): void {
    this.open.set(false);
  }

  protected onOpen(): void {
    this.open.set(true);
  }
}
