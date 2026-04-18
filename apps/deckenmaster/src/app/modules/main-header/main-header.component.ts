import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePhone, lucideMenu, lucideX } from '@ng-icons/lucide';
import { PhoneFormatPipe } from '@atlas/core';
import { TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { MAX_CONTACT, PHONE_CONTACT, TELEGRAM_CONTACT } from '../../contacts';
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
  protected readonly telegramContact = inject(TELEGRAM_CONTACT);
  protected readonly maxContact = inject(MAX_CONTACT);
  protected readonly phoneContact = inject(PHONE_CONTACT);
}
