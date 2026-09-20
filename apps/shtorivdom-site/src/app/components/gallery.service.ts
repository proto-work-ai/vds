import {
  computed,
  contentChildren,
  Directive,
  ElementRef,
  forwardRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface GalleryImage {
  src: string;
  alt: string;
}

@Injectable({ providedIn: 'root' })
export class GalleryService {
  public readonly images = signal<GalleryImage[]>([]);
  public readonly index = signal(0);
  public readonly current = computed(() => this.images()[this.index()]);
  public opener?: HTMLElement;

  constructor() {
    inject(Router)
      .events.pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (event instanceof NavigationStart) this.close();
      });
  }

  public open(images: GalleryImage[], index: number, opener: HTMLElement): void {
    this.opener = opener;
    this.index.set(index);
    this.images.set(images);
  }

  public move(direction: number): void {
    const count = this.images().length;
    if (count) this.index.update((index) => (index + direction + count) % count);
  }

  public close(): void {
    this.images.set([]);
  }
}

@Directive({ selector: '[data-gallery]' })
export class GalleryGroupDirective {
  public readonly items = contentChildren(
    forwardRef(() => GalleryItemDirective),
    { descendants: true },
  );
}

@Directive({
  selector: '[data-gallery-item]',
  host: {
    '(click)': 'open($event)',
    '(keydown.enter)': 'open($event)',
    '(keydown.space)': 'open($event)',
    role: 'button',
    tabindex: '0',
    'aria-haspopup': 'dialog',
  },
})
export class GalleryItemDirective {
  private readonly gallery = inject(GalleryService);
  private readonly group = inject(GalleryGroupDirective, { optional: true, skipSelf: true });
  public readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  public readonly image: GalleryImage = {
    src: this.element.getAttribute('data-src') ?? '',
    alt: this.element.getAttribute('data-alt') ?? '',
  };

  protected open(event: Event): void {
    event.preventDefault();
    const items = this.group?.items() as readonly GalleryItemDirective[] | undefined;
    const collection = items?.includes(this) ? items : [this];
    this.gallery.open(
      collection.map((item) => item.image),
      collection.indexOf(this),
      this.element,
    );
  }
}

export const GALLERY = [GalleryGroupDirective, GalleryItemDirective] as const;
