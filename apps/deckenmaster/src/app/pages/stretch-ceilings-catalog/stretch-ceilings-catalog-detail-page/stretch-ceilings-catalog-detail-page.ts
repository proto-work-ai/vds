/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, DestroyRef, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { injectStretchCeilingRouteByKey } from '../../../model/stretch-ceilings.service';
import { MainHeaderComponent } from '../../../modules/main-header/main-header.component';
import { ApplicationMeasurementComponent } from '../../../modules/application-measurement/application-measurement.component';
import { FooterMenuComponent } from '../../../modules/footer-menu/footer-menu.component';
import { MenuDeferService } from '../../../components/menu-defer/menu-defer-host.service';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { NavMenu } from '../../../modules/nav-menu/nav-menu';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { GalleryModule, ImageItem } from 'ng-gallery';
import { GallerizeDirective } from 'ng-gallery/lightbox';
import { SwiperDetailImages } from '../../../components/swiper-detail-images/swiper-detail-images';
import { GallerizeImages } from '../../../components/gallerize-images/gallerize-images';
import { injectCatalogPrice } from '../../../model/price-list-all';
import { injectPhoneSendModal } from '../../../modules/send-service/send.services';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'st-catalog-getail',
  templateUrl: 'stretch-ceilings-catalog-detail-page.html',
  styleUrls: ['stretch-ceilings-catalog-detail-page.scss'],
  imports: [
    FooterMenuComponent,
    BreadcrumbsHeader,
    NavMenu,
    RouterOutlet,
    GalleryModule,
    MainHeaderComponent,
    ApplicationMeasurementComponent,
    GallerizeImages,
    AsyncPipe,
    GallerizeDirective,
    SwiperDetailImages,
  ],
  providers: [MenuDeferService],
  host: {
    id: 'main',
  },
})
export class StretchCeilingsCatalogDetailPage {
  private readonly destroyRef = inject(DestroyRef);
  private readonly meta = inject(Title);
  protected readonly breadcrumbs = signal<IBreadcrumbItem[]>([]);
  protected readonly openPhoneSendModal = injectPhoneSendModal();
  protected readonly item = injectStretchCeilingRouteByKey();
  private readonly platformId = inject(PLATFORM_ID);
  protected get isPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }
  protected readonly minPrice = injectCatalogPrice();

  protected readonly title = computed(() => this.item()?.title);
  protected readonly description = computed(() => this.item().brief);
  protected readonly price = computed(() => this.minPrice(this.item().types));
  protected readonly images = computed(() => this.item()?.images.map((src) => new ImageItem({ src, thumb: src })));

  constructor() {
    const title = `Decken Master | ${this.item().title}`;
    inject(Title).setTitle(title);
    inject(Meta).updateTag({ property: 'og:title', content: title });
    const image = this.item()?.images?.[0];
    if (image) {
      inject(Meta).updateTag({ property: 'og:image', content: image });
    }
    inject(Meta).updateTag({ name: 'description', content: this.description() });

    effect(() => {
      const item = this.item();
      if (item) {
        this.breadcrumbs.set([
          {
            title: 'Главная',
            link: ['/'],
          },
          {
            title: 'Каталог',
            link: ['/catalog'],
          },
          {
            title: item.title,
          },
        ]);
      }
    });
  }

  protected formSubmit() {
    this.openPhoneSendModal().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
