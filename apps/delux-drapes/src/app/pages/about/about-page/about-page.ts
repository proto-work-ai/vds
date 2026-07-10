/* eslint-disable @angular-eslint/component-selector */
import { Component, inject, signal } from '@angular/core';
import { MenuDeferService } from '../../../components/menu-defer/menu-defer-host.service';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { WayWeWorkComponent } from '../../../modules/way-we-work/way-we-work.component';
import { ScrollLink } from '../../../components/scroll-link/scroll-link.directive';
import { MAX_CONTACT, PERIOD_CONTACT, PHONE_CONTACT, TELEGRAM_CONTACT } from '../../../contacts';
import { MainHeaderComponent } from '../../../modules/main-header/main-header.component';
import { MainForm } from "../../../modules/main-form/main-form.component";
import { MainAbout } from "../../../modules/main-about/main-about.component";
import { MainFooterComponent } from "../../../modules/main-footer/main-footer.component";

@Component({
  selector: 'main',
  templateUrl: 'about-page.html',
  styleUrls: ['about-page.scss'],
  imports: [ScrollLink, BreadcrumbsHeader, WayWeWorkComponent, MainHeaderComponent, MainForm, MainAbout, MainFooterComponent],
  // providers: [MenuDeferService],
  host: { id: 'main' },
})
export class AboutPage {
  protected readonly telegramContact = inject(TELEGRAM_CONTACT);
  protected readonly maxContact = inject(MAX_CONTACT);
  protected readonly phoneContact = inject(PHONE_CONTACT);
  protected readonly periodContact = inject(PERIOD_CONTACT);

  protected readonly breadcrumbs = signal<IBreadcrumbItem[]>([
    {
      title: 'Главная',
      link: ['/'],
    },
    {
      title: 'О нас',
    },
  ] as const);
}
