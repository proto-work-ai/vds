import { Component, computed, inject } from '@angular/core';
import { PhoneFormatPipe } from '@atlas/core';
import {
  COMPANY_NAME,
  EMAIL_CONTACT,
  MAX_CONTACT,
  PERIOD_CONTACT,
  PHONE_CONTACT,
  TELEGRAM_CONTACT,
} from '../../contacts';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucidePhone } from '@ng-icons/lucide';
import { NgTemplateOutlet } from '@angular/common';
import { ScrollLink } from '../../components/scroll-link/scroll-link.directive';
import { injectFooterMenu } from '../../model/catalog.service';
import { NgIconImports } from '@atlas/core';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
  imports: [NgIconImports, PhoneFormatPipe, RouterLink, NgTemplateOutlet, ScrollLink],
  providers: [
    provideIcons({
      lucidePhone,
    }),
  ],
})
export class MainFooterComponent {
  protected readonly telegramContact = inject(TELEGRAM_CONTACT);
  protected readonly maxContact = inject(MAX_CONTACT);
  protected readonly phoneContact = inject(PHONE_CONTACT);
  protected readonly periodContact = inject(PERIOD_CONTACT);
  protected readonly emailContact = inject(EMAIL_CONTACT);
  protected readonly companyName = inject(COMPANY_NAME);

  private readonly navMenu = injectFooterMenu();
  protected readonly footerMenu = computed(() => {
    const result = [];
    const menu = this.navMenu();

    result.push({
      title: 'Меню',
      children: [...menu.slice(0, 3)],
    });

    result.push(...menu.slice(3));
    return result;
  });
}
