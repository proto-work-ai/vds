import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { GallerizeDirective } from 'ng-gallery/lightbox';
import { GalleryModule, ImageItem } from 'ng-gallery';
import { IStretchCeiling } from '../../model/stretch-ceilings.data';

@Component({
  selector: 'app-gallerize-images',
  templateUrl: 'gallerize-images.html',
  styleUrls: ['gallerize-images.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Essential for <swiper-container>
  imports: [GallerizeDirective, GalleryModule],
})
export class GallerizeImages {
  public readonly item = input.required<IStretchCeiling>();
  // protected readonly images = computed(() => this.item()?.images);
  protected readonly images = computed(() => this.item()?.images.map((src) => new ImageItem({ src, thumb: src })));
}
