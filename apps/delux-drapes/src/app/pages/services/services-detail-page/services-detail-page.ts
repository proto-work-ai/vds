/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, DestroyRef, effect, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser, JsonPipe } from '@angular/common';
import { GalleryModule, ImageItem } from 'ng-gallery';
import { Meta, Title } from '@angular/platform-browser';
import { injectStretchCeilingRouteByKey } from '../../../model/stretch-ceilings.service';
import { MainHeaderComponent } from '../../../modules/main-header/main-header.component';
import { ApplicationMeasurementComponent } from '../../../modules/application-measurement/application-measurement.component';
import { FooterMenuComponent } from '../../../modules/footer-menu/footer-menu.component';
import { MenuDeferService } from '../../../components/menu-defer/menu-defer-host.service';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { NavMenu } from '../../../modules/nav-menu/nav-menu';
import { SwiperFullImages } from '../../../components/swiper-full-images/swiper-full-images';
import { GallerizeImages } from '../../../components/gallerize-images/gallerize-images';
import { getCatalogMap2, injectCatalogPrice } from '../../../model/price-list-all';
import { injectPhoneSendModal } from '../../../modules/send-service/send.services';
import { PriceCard } from '../../../modules/stretch-ceilings-catalog/price-card';
import { PriceListBrandTable } from '../../../modules/catalog-price/price-list-brand-table/price-list-brand-table';
import { IContentType } from '../../../model/products.data';
import { PriceListTable } from '../../../modules/catalog-price/price-list-table/price-list-table';
import { WayWeWorkComponent } from '../../../modules/way-we-work/way-we-work.component';
import { AnyQuestions } from '../../../components/any-questions/any-questions';

@Component({
  selector: 'app-services-detail-page',
  templateUrl: 'services-detail-page.html',
  styleUrls: ['services-detail-page.scss'],
  imports: [
    FooterMenuComponent,
    BreadcrumbsHeader,
    NavMenu,
    RouterOutlet,
    GalleryModule,
    MainHeaderComponent,
    GallerizeImages,
    PriceCard,
    AnyQuestions,
    SwiperFullImages,
    PriceListBrandTable,
    ApplicationMeasurementComponent,
    PriceListTable,
    WayWeWorkComponent,
    JsonPipe,
  ],
  providers: [
    MenuDeferService,
    // {
    //   provide: TuiDialogService,
    //   useExisting: TuiResponsiveDialogService,
    // },
  ],
  host: {
    id: 'main',
  },
})
export class ServicesDetailPpage {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly breadcrumbs = signal<IBreadcrumbItem[]>([]);
  protected readonly openPhoneSendModal = injectPhoneSendModal();
  protected readonly item: WritableSignal<IContentType> = injectStretchCeilingRouteByKey();
  protected readonly minPrice = injectCatalogPrice();

  protected readonly title = computed(() => this.item()?.title);
  protected readonly brief = computed(() => this.item().brief);
  protected readonly price = computed(() => {
    const types = this.item().types;
    const data = this.minPrice(types);
    return data?.[0];
  });
  protected readonly images = computed(() => this.item()?.images.map((src) => new ImageItem({ src, thumb: src })));
  protected readonly filtered = computed(() => {
    return getCatalogMap2(this.item().types);
  });

  constructor() {
    const title = `Decken Master | ${this.item().title}`;
    inject(Title).setTitle(title);
    inject(Meta).updateTag({ property: 'og:title', content: title });
    const image = this.item()?.images?.[0];
    if (image) {
      inject(Meta).updateTag({ property: 'og:image', content: image });
    }
    inject(Meta).updateTag({ name: 'description', content: this.brief() });

    effect(() => {
      const item = this.item();
      if (item) {
        this.breadcrumbs.set([
          {
            title: 'Главная',
            link: ['/'],
          },
          // {
          //   title: 'Услуги',
          //   link: ['/catalog'],
          // },
          {
            title: item.title,
          },
        ]);
      }
    });
  }

  protected formSubmit() {
    this.openPhoneSendModal();
  }
}
