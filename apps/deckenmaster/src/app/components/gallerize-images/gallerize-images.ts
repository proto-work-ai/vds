import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, inject, input } from '@angular/core';
import { GallerizeDirective } from 'ng-gallery/lightbox';
import { GalleryModule, ImageItem } from 'ng-gallery';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { IStretchCeiling } from '../../model/products.data';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-gallerize-images',
  templateUrl: 'gallerize-images.html',
  styleUrls: ['gallerize-images.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Essential for <swiper-container>
  imports: [GallerizeDirective, GalleryModule],
})
export class GallerizeImages {
  private destroyRef = inject(DestroyRef);
  private breakpointObserver = inject(BreakpointObserver);
  public readonly item = input.required<IStretchCeiling>();
  // protected readonly images = computed(() => this.item()?.images);
  protected readonly images = computed(() => this.item()?.images.map((src) => new ImageItem({ src, thumb: src })));

  protected readonly position = toSignal(
    this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map((result) => (result.matches ? 'bottom' : 'right')))
  );
}
