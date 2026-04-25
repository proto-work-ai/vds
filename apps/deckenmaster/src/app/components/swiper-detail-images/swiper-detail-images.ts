import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { IStretchCeiling } from '../../model/stretch-ceilings.data';
register();

@Component({
  selector: 'app-swiper-detail-images',
  templateUrl: 'swiper-detail-images.html',
  styleUrls: ['swiper-detail-images.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Essential for <swiper-container>
})
export class SwiperDetailImages {
  public readonly item = input.required<IStretchCeiling>();
  protected readonly images = computed(() => this.item()?.images);
}
