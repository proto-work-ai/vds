import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePhone, lucideMenu, lucideX } from '@ng-icons/lucide';
import { PhoneFormatPipe } from '@atlas/core';
import { TuiDataList, TuiDropdown, TuiPopup, TuiTitle } from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';
import { TuiHeader } from '@taiga-ui/layout';
import { MAX_CONTACT, PHONE_CONTACT, TELEGRAM_CONTACT } from '../../contacts';
import { MenuDeferService } from '../../components/menu-defer/menu-defer-host.service';
import { ScrollLink } from '../../components/scroll-link/scroll-link.directive';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  imports: [
    NgIcon,
    RouterLink,
    PhoneFormatPipe,
    TuiDataList,
    TuiDropdown,
    TuiDataList,
    TuiDropdown,
    TuiDrawer,
    TuiPopup,
    TuiTitle,
    TuiHeader,
    RouterLink,
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
export class MainHeaderComponent {
  protected readonly items = inject(MenuDeferService).items;

  protected readonly telegramContact = inject(TELEGRAM_CONTACT);
  protected readonly maxContact = inject(MAX_CONTACT);
  protected readonly phoneContact = inject(PHONE_CONTACT);

  protected open = signal(false);

  protected onClose(): void {
    this.open.set(false);
  }

  protected onOpen(): void {
    this.open.set(true);
  }
}
