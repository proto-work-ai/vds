import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePhone, lucideMenu, lucideX } from '@ng-icons/lucide';
import { PhoneFormatPipe } from '@atlas/core';
import { NgForOf, NgIf } from '@angular/common';
import { TuiButton, TuiDataList, TuiDropdown, TuiIcon, TuiLink, TuiPopup, TuiTitle } from '@taiga-ui/core';
import { TuiChevron, TuiDrawer, TuiStep } from '@taiga-ui/kit';
import { TuiHeader } from '@taiga-ui/layout';
import { TuiRepeatTimes } from '@taiga-ui/cdk';
import { MAX_CONTACT, PHONE_CONTACT, TELEGRAM_CONTACT } from '../../contacts';

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
  protected readonly telegramContact = inject(TELEGRAM_CONTACT);
  protected readonly maxContact = inject(MAX_CONTACT);
  protected readonly phoneContact = inject(PHONE_CONTACT);

  protected readonly items = ['Услуги', 'Акции', 'О компании', 'Контакты'];

  protected open = false;

  protected onClose(): void {
    this.open = false;
  }

  protected onOpen(): void {
    this.open = true;
  }
}
