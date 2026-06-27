/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, DestroyRef, effect, inject, signal, WritableSignal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { GalleryModule, ImageItem } from 'ng-gallery';
import { Meta, Title } from '@angular/platform-browser';
import { injectStretchCeilingRouteByKey } from '../../../model/catalog.service';
import { MenuDeferService } from '../../../components/menu-defer/menu-defer-host.service';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { SwiperFullImages } from '../../../components/swiper-full-images/swiper-full-images';
import { GallerizeImages } from '../../../components/gallerize-images/gallerize-images';
import { injectPhoneSendModal } from '../../../modules/send-service/send.services';
import { PriceListBrandTable } from '../../../modules/catalog-price/price-list-brand-table/price-list-brand-table';
import { IContentType } from '../../../model/products.data';
import { WayWeWorkComponent } from '../../../modules/way-we-work/way-we-work.component';
import { AnyQuestions } from '../../../components/any-questions/any-questions';
import { MainFooterComponent } from '../../../modules/main-footer/main-footer.component';
import { MainHeaderComponent } from '../../../modules/main-header/main-header.component';
import { MainBannerComponent } from '../../../modules/main-banner/main-banner.component';
import { MainForm } from '../../../modules/main-form/main-form.component';
import { MainQuestions } from '../../../modules/main-questions/main-questions.component';
import { InviteModalClick } from '../../../components/invite-designer/invite-designer-modal';
import { PlaceAnOrder } from "../../../modules/place-an-order/place-an-order.component";
import { MainBannerForm } from "../../../modules/main-banner-form/main-banner-form.component";

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
    MainForm,
    RouterLink,
    MainBannerComponent,
    AnyQuestions,
    PriceListBrandTable,
    GallerizeImages,
],
  providers: [MenuDeferService],
  host: {
    id: 'main',
  },
})
export class CatalogDetailPage {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly breadcrumbs = signal<IBreadcrumbItem[]>([]);
  protected readonly openPhoneSendModal = injectPhoneSendModal();
  protected readonly item: WritableSignal<IContentType> = injectStretchCeilingRouteByKey();

  protected readonly title = computed(() => this.item()?.title);
  protected readonly text = computed(() => this.item().text);

  protected readonly images = computed(() => this.item()?.images!.map((src) => new ImageItem({ src, thumb: src })));

  constructor() {
    const title = `Shtorivdom | ${this.item().title}`;
    inject(Title).setTitle(title);
    inject(Meta).updateTag({ property: 'og:title', content: title });
    const image = this.item()?.images?.[0];
    if (image) {
      inject(Meta).updateTag({ property: 'og:image', content: image });
    }
    inject(Meta).updateTag({ name: 'description', content: this.text() } as any);

    effect(() => {
      const item = this.item();
      if (item) {
        this.breadcrumbs.set([
          {
            title: 'Главная',
            link: ['/'],
          },
          // {
          //   title: 'Каталог',
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
