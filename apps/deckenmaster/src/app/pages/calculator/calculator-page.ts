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

@Component({
  selector: 'main',
  templateUrl: './calculator-page.html',
  imports: [MainHeaderComponent, BreadcrumbsHeader, FooterMenuComponent, RouterLink, CeilingCalculator, NavMenu, MainAdvantagesComponent, WayWeWorkComponent, ApplicationMeasurementComponent, SocialButtons],
  host: {
    id: 'main',
  },
})
export class CalculatorPage {
  protected readonly breadcrumbs = signal<IBreadcrumbItem[]>([
    {
      title: 'Главная',
      link: ['/'],
    },
    {
      title: 'Калькулятор натяжного потолка',
    },
  ]);

  constructor() {
    setMeta({
      title: `Decken Master | Калькулятор натяжного потолка`,
      description: `Калькулятор для расчета стоимости натяжных потолков. Вы самостоятельно можете получить примерную цену вашего нового потолка в 10 кликов.`,
    });
  }
}
