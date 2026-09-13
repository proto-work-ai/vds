import { Component, computed, input, PLATFORM_ID, inject, viewChild, ElementRef, effect } from '@angular/core';
import Swiper from 'swiper';
import { isPlatformBrowser } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight } from '@ng-icons/lucide';
import { Navigation } from 'swiper/modules';
import { IContentType } from '../../model/products.data';
import { IsPlatformBrowserDirective } from '../is-platform-browser.directive';
import { NgIconImports } from '@atlas/core';

@Component({
  selector: 'app-swiper-full-images',
  templateUrl: 'swiper-full-images.html',
  styleUrls: ['swiper-full-images.scss'],
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucideChevronRight,
    }),
  ],
  imports: [NgIconImports, IsPlatformBrowserDirective],
})
export class SwiperFullImages {
  protected swiperRef = viewChild<ElementRef>('swiper');
  public readonly item = input.required<IContentType>();
  protected readonly images = computed(() => this.item()?.images);
  protected swiper!: Swiper;

  private readonly platformId = inject(PLATFORM_ID);
  protected get isPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }
  constructor() {
    if (this.isPlatformBrowser) {
      effect(() => {
        const element = this.swiperRef();
        if (element) {
          this.swiper = new Swiper(element.nativeElement, {
            modules: [Navigation],
            speed: 400,
            spaceBetween: 10,
            slidesPerView: 2,
            navigation: {
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            },
            breakpoints: {
              400: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              600: {
                slidesPerView: 2,
              },
              800: {
                slidesPerView: 3,
              },
            },
          });
        }
      });
    }
  }
}
