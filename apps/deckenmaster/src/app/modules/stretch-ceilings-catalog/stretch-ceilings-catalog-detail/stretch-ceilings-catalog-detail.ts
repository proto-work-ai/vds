import { Component, computed, DestroyRef, effect, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { GalleryModule, ImageItem } from 'ng-gallery';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { GallerizeDirective } from 'ng-gallery/lightbox';
import { ComponentPortal, ComponentType, PortalModule } from '@angular/cdk/portal';
import { IStretchCeiling } from '../../../model/stretch-ceilings.data';
import { map, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-stretch-ceilings-catalog-detail',
  templateUrl: 'stretch-ceilings-catalog-detail.html',
  styleUrls: ['stretch-ceilings-catalog-detail.scss'],
  imports: [GalleryModule, GallerizeDirective, PortalModule, AsyncPipe],
})
export class StretchCeilingsCatalogDetail {
  readonly destroyRef = inject(DestroyRef);
  readonly item = input.required<IStretchCeiling>();
  readonly platformId = inject(PLATFORM_ID);

  protected readonly title = computed(() => this.item()?.title);
  protected readonly brief = computed(() => this.item()?.brief);
  protected readonly images = computed(() => this.item()?.images.map((src) => new ImageItem({ src, thumb: src })));
  protected readonly detail$ = new Subject<Promise<ComponentType<any>>>();
  protected readonly detail = signal<ComponentPortal<any> | undefined>(undefined);

  constructor() {
    this.detail$
      .pipe(
        switchMap((a) => a),
        map((a) => new ComponentPortal(a)),
        tap((a) => this.detail.set(a)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    effect(() => {
      const item = this.item();
      if (item) {
        this.detail$.next(item.detail());
      } else {
        // this.detail$.next(undefined);
      }
    });
  }

  protected get isPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
