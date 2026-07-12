/* eslint-disable @angular-eslint/component-selector */
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterMenuComponent } from '../../modules/footer-menu/footer-menu.component';
import { MainHeaderComponent } from '../../modules/main-header/main-header.component';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { setMeta } from '@atlas/core';
import { CeilingCalculator } from '../../components/ceiling-calculator/ceiling-calculator';
import { NavMenu } from "../../modules/nav-menu/nav-menu";
import { MainAdvantagesComponent } from "../../modules/main-advantages/main-advantages.component";
import { WayWeWorkComponent } from "../../modules/way-we-work/way-we-work.component";
import { ApplicationMeasurementComponent } from "../../modules/application-measurement/application-measurement.component";
import { SocialButtons } from "../../components/social-buttons/social-buttons";
import { CeilingEventsComponent } from "../../modules/ceiling-events/ceiling-events.component";

@Component({
  selector: 'main',
  templateUrl: './events-page.html',
  imports: [MainHeaderComponent, BreadcrumbsHeader, FooterMenuComponent, RouterLink, CeilingCalculator, NavMenu, MainAdvantagesComponent, WayWeWorkComponent, ApplicationMeasurementComponent, SocialButtons, CeilingEventsComponent],
  host: {
    id: 'main',
  },
})
export class EventsPage {
  protected readonly breadcrumbs = signal<IBreadcrumbItem[]>([
    {
      title: 'Главная',
      link: ['/'],
    },
    {
      title: 'Акции и скидки',
    },
  ]);

  constructor() {
    setMeta({
      title: `DeckenMaster | Акции и скидки на установку натяжных потолков в Москве`,
      description: `Акции, скидки и выгодные предложения по натяжным потолкам`,
    });
  }
}
