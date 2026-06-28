/* eslint-disable @angular-eslint/component-selector */
import { Component, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FooterMenuComponent } from '../../modules/footer-menu/footer-menu.component';
import { MainHeaderComponent } from '../../modules/main-header/main-header.component';
import { MenuDeferService } from '../../components/menu-defer/menu-defer-host.service';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../modules/breadcrumbs-header/breadcrumbs-header.component';


@Component({
  selector: 'main',
  templateUrl: './privacy-policy-page.html',
  imports: [MainHeaderComponent, RouterLink, BreadcrumbsHeader, FooterMenuComponent],
  providers: [MenuDeferService],
  host: {
    id: 'main',
  },
})
export class PrivacyPolicyPage {
  protected readonly breadcrumbs = signal<IBreadcrumbItem[]>([
    {
      title: 'Главная',
      link: ['/'],
    },
    {
      title: 'Политика конфиденциальности',
    },
  ]);

  constructor() {
    const title = `Decken Master | Политика конфиденциальности`;
    inject(Title).setTitle(title);
    inject(Meta).updateTag({ property: 'og:title', content: title });

    inject(Meta).updateTag({
      name: 'description',
      content: `Политика конфиденциальности, соглашение на обработку информации на сайте`,
    });
  }
}
