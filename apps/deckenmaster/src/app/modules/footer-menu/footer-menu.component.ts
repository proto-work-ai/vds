import { Component, inject } from '@angular/core';
import { PhoneFormatPipe } from '@atlas/core';
import { MAX_CONTACT, PERIOD_CONTACT, PHONE_CONTACT, TELEGRAM_CONTACT } from '../../contacts';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePhone } from '@ng-icons/lucide';
import { NgTemplateOutlet } from '@angular/common';
import { MenuDeferService } from '../../components/menu-defer/menu-defer-host.service';
import { ScrollLink } from '../../components/scroll-link/scroll-link.directive';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss'],
  imports: [NgIcon, PhoneFormatPipe, RouterLink, NgTemplateOutlet, ScrollLink],
  providers: [
    provideIcons({
      lucidePhone,
    }),
  ],
})
export class FooterMenuComponent {
  protected readonly items = inject(MenuDeferService).items;
  protected readonly telegramContact = inject(TELEGRAM_CONTACT);
  protected readonly maxContact = inject(MAX_CONTACT);
  protected readonly phoneContact = inject(PHONE_CONTACT);
  protected readonly periodContact = inject(PERIOD_CONTACT);
}
