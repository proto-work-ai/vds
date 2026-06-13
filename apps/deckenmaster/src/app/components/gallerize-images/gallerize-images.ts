import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, inject, input } from '@angular/core';
import { GallerizeDirective } from 'ng-gallery/lightbox';
import { GalleryModule, ImageItem } from 'ng-gallery';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { IContentType } from '../../model/stretch-ceiling';
import { IsPlatformBrowserDirective } from '../is-platform-browser.directive';

@Component({
  selector: 'app-gallerize-images',
  templateUrl: 'gallerize-images.html',
  styleUrls: ['gallerize-images.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Essential for <swiper-container>
  imports: [GallerizeDirective, GalleryModule, IsPlatformBrowserDirective],
})
export class GallerizeImages {
  private destroyRef = inject(DestroyRef);
  private breakpointObserver = inject(BreakpointObserver);
  public readonly id = input.required<string>();
  public readonly item = input.required<IContentType>();
  // protected readonly images = computed(() => this.item()?.images);
  protected readonly images = computed(() => this.item()?.images.map((src) => new ImageItem({ src, thumb: src })));

  protected readonly position = toSignal(
    this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map((result) => (result.matches ? 'bottom' : 'right')))
  );
}
