import { Component, computed, DestroyRef, inject, input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { IContentType } from '../../common';
import { GalleryModule, ImageItem } from 'ng-gallery';
import { IsPlatformBrowserDirective } from '../../../../components/is-platform-browser.directive';
import { GallerizeDirective } from 'ng-gallery/lightbox';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  templateUrl: 'stretch-ceiling-photo-printing.html',
  imports: [GallerizeDirective, GalleryModule, IsPlatformBrowserDirective],
})
export class Detail {
  private destroyRef = inject(DestroyRef);
  private breakpointObserver = inject(BreakpointObserver);
  public readonly item = input.required<IContentType>();
  // protected readonly images = computed(() => this.item()?.images);
  protected readonly images = computed(() => {
    return ' '
      .repeat(65)
      .split('')
      .map((_, index) => `/catalog/stretch-ceiling-photo-printing/images/${index + 1}.jpg`)
      .map((src) => new ImageItem({ src, thumb: src }));
  });

  protected readonly position = toSignal(
    this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map((result) => (result.matches ? 'bottom' : 'right'))),
    { initialValue: 'right' }
  );
}
