/* eslint-disable @angular-eslint/component-selector */
import { Component, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MainHeaderComponent } from '../../modules/main-header/main-header.component';
import { NavMenu } from '../../modules/nav-menu/nav-menu';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { MainFooterComponent } from '../../modules/main-footer/main-footer.component';

@Component({
  selector: 'main',
  templateUrl: './soglasie-na-obrabotku-personalnyh-dannyh.html',
  imports: [MainHeaderComponent, BreadcrumbsHeader, MainFooterComponent, NavMenu],
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
      title: 'Согласие на обработку персональных данных',
    },
  ]);

  constructor() {
    const title = `Shtorivdom | Согласие на обработку персональных данных`;
    inject(Title).setTitle(title);
    inject(Meta).updateTag({ property: 'og:title', content: title });

    inject(Meta).updateTag({
      name: 'description',
      content: `Согласие на обработку персональных данных. Перечень персональных данных, цели обработки, срок действия согласия и порядок отзыва.`,
    });
  }
}
