import { Component, input, PLATFORM_ID, inject, viewChild, ElementRef, effect, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { isPlatformBrowser } from '@angular/common';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight } from '@ng-icons/lucide';
import { Navigation } from 'swiper/modules';
import { LightboxModule } from 'ng-gallery/lightbox';
import { Gallery, GalleryItem } from 'ng-gallery';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import { IsPlatformBrowserDirective } from '../is-platform-browser.directive';

/*
  https://swiperjs.com/swiper-api
*/
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
  // encapsulation: ViewEncapsulation.None,
  imports: [NgIcon, IsPlatformBrowserDirective, LightboxModule, PhotoGalleryModule],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA], // Essential for <swiper-container>
})
export class SwiperFullImages implements OnInit {
  protected toggler = false;
  protected slide = 1;

  protected swiper!: Swiper;
  protected swiperRef = viewChild<ElementRef>('swiper');
  public readonly images = input.required<readonly string[]>();

  private readonly gallery = inject(Gallery);
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
            slidesPerView: 4,
            // slidesPerView: "auto",
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            breakpoints: {
              400: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              600: {
                slidesPerView: 4,
              },
              800: {
                slidesPerView: 5,
              },
            },
          });
        }
      });
    }
  }

  ngOnInit() {
    const galleryRef = this.gallery.ref('galleryId');
    galleryRef.load(
      this.images().map((src) => {
        return {
          data: {
            src,
            thumb: src,
          },
          type: 'image',
        } satisfies GalleryItem;
      })
    );
  }

  protected open(n: number) {
    this.slide = n;
    this.toggler = !this.toggler;
  }
}
