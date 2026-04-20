import { Component, computed, inject, input, PLATFORM_ID } from '@angular/core';
import { GalleryModule, ImageItem } from 'ng-gallery';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { GallerizeDirective } from 'ng-gallery/lightbox';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { IStretchCeiling } from '../../../model/stretch-ceilings.data';

@Component({
  selector: 'app-stretch-ceilings-catalog-detail',
  templateUrl: 'stretch-ceilings-catalog-detail.html',
  styleUrls: ['stretch-ceilings-catalog-detail.scss'],
  imports: [GalleryModule, GallerizeDirective, PortalModule, AsyncPipe],
})
export class StretchCeilingsCatalogDetail {
  readonly item = input.required<IStretchCeiling>();
  readonly platformId = inject(PLATFORM_ID);

  protected readonly title = computed(() => this.item()?.title);
  protected readonly brief = computed(() => this.item()?.brief);
  protected readonly images = computed(() => this.item()?.images.map((src) => new ImageItem({ src, thumb: src })));
  protected readonly detail = computed(() =>
    this.item()
      ?.detail()
      .then((a) => new ComponentPortal(a))
  );

  protected get isPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
