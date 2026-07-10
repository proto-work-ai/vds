/* eslint-disable @angular-eslint/component-selector */
import { Component, signal } from '@angular/core';
import { setMeta } from '@atlas/core';
import { FooterMenuComponent } from '../../modules/footer-menu/footer-menu.component';
import { MainHeaderComponent } from '../../modules/main-header/main-header.component';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { NavMenu } from "../../modules/nav-menu/nav-menu";
import { WayWeWorkComponent } from "../../modules/way-we-work/way-we-work.component";
import { ApplicationMeasurementComponent } from "../../modules/application-measurement/application-measurement.component";
import { SocialButtons } from "../../components/social-buttons/social-buttons";
import { stretchCeilingMaterials } from '../../model/ceiling-materials';
import { CeilingInstallationsComponent } from "../../modules/ceiling-materials/ceiling-installations.component";

@Component({
  selector: 'main',
  templateUrl: './ceiling-materials-page.html',
  imports: [MainHeaderComponent, BreadcrumbsHeader, FooterMenuComponent, NavMenu, WayWeWorkComponent, ApplicationMeasurementComponent, SocialButtons, CeilingInstallationsComponent],
  host: {
    id: 'main',
  },
})
export class CeilingMaterialsPage {
  protected readonly breadcrumbs = signal<IBreadcrumbItem[]>([
    {
      title: 'Главная',
      link: ['/'],
    },
    {
      title: 'Материалы полотна для натяжных потолков',
    },
  ]);

  protected readonly stretchCeilingMaterials = stretchCeilingMaterials;

  constructor() {
    setMeta({
      title: `DeckenMaster | Выбор материала полотна для натяжных потолков с установкой`,
      description: `Огромный ассортимент материалов полотен натяжных потолков с установкой`,
    });
  }
}
