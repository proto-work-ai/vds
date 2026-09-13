/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GalleryModule, ImageItem } from 'ng-gallery';
import { Meta, Title } from '@angular/platform-browser';
import { injectCatalogItemByKey } from '../../../model/catalog.service';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { SwiperFullImages } from '../../../components/swiper-full-images/swiper-full-images';
import { injectPhoneSendModal } from '../../../modules/send-service/send.services';
import { PriceListBrandTable } from '../../../modules/catalog-price/price-list-brand-table/price-list-brand-table';
import { IContentType } from '../../../model/products.data';
import { curtainPriceMap } from '../../../model/price-list.service';
import { SITE_URL } from '../../../seo';
import { WayWeWorkComponent } from '../../../modules/way-we-work/way-we-work.component';
import { MainFooterComponent } from '../../../modules/main-footer/main-footer.component';
import { MainHeaderComponent } from '../../../modules/main-header/main-header.component';
import { MainQuestions } from '../../../modules/main-questions/main-questions.component';
import { InviteModalClick } from '../../../components/invite-designer/invite-designer-modal';
import { PlaceAnOrder } from '../../../modules/place-an-order/place-an-order.component';
import { MainBannerForm } from '../../../modules/main-banner-form/main-banner-form.component';

@Component({
  selector: 'app-catalog-getail',
  templateUrl: 'catalog-detail-page.html',
  styleUrls: ['catalog-detail-page.scss'],
  imports: [
    BreadcrumbsHeader,
    GalleryModule,
    WayWeWorkComponent,
    MainQuestions,
    MainFooterComponent,
    MainHeaderComponent,
    SwiperFullImages,
    RouterOutlet,
    InviteModalClick,
    PlaceAnOrder,
    MainBannerForm,
    PriceListBrandTable,
  ],
  host: {
    id: 'main',
  },
})
export class CatalogDetailPage {
  protected readonly breadcrumbs = signal<IBreadcrumbItem[]>([]);
  protected readonly openPhoneSendModal = injectPhoneSendModal();
  protected readonly item: WritableSignal<IContentType> = injectCatalogItemByKey();

  protected readonly title = computed(() => this.item()?.title);
  protected readonly text = computed(() => this.item().text);

  protected readonly images = computed(() => this.item()?.images!.map((src) => new ImageItem({ src, thumb: src })));
  protected readonly prices = computed(() => curtainPriceMap[this.item()?.key] ?? []);

  constructor() {
    const title = `${this.item().title} на заказ в Москве | Shtorivdom`;
    const description = `${this.item().title} на заказ: ${this.text()} Бесплатный выезд дизайнера с образцами.`;
    const meta = inject(Meta);
    inject(Title).setTitle(title);
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ name: 'description', content: description });
    meta.updateTag({ property: 'og:description', content: description });
    const image = this.item()?.images?.[0];
    if (image) {
      // Соцсети и мессенджеры принимают только абсолютный адрес картинки.
      meta.updateTag({ property: 'og:image', content: `${SITE_URL}${image}` });
    }

    effect(() => {
      const item = this.item();
      if (item) {
        this.breadcrumbs.set([
          {
            title: 'Главная',
            link: ['/'],
          },
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
