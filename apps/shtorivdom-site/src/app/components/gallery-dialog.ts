import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { GalleryService } from './gallery.service';

@Component({
  selector: 'app-gallery-dialog',
  imports: [],
  templateUrl: './gallery-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryDialog {
  protected readonly gallery = inject(GalleryService);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private start: { x: number; y: number } | null = null;

  constructor() {
    afterRenderEffect((cleanup) => {
      const dialog = this.dialog().nativeElement;
      if (this.gallery.current()) {
        if (!dialog.open) dialog.showModal();
        const html = dialog.ownerDocument.documentElement;
        const overflow = html.style.overflow;
        html.style.overflow = 'hidden';
        cleanup(() => {
          html.style.overflow = overflow;
        });
      } else if (dialog.open) {
        dialog.close();
        this.gallery.opener?.focus({ preventScroll: true });
      }
    });
  }

  protected key(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.gallery.move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  protected touchStart(event: TouchEvent): void {
    this.start = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }

  protected touchEnd(event: TouchEvent): void {
    if (!this.start) return;
    const dx = event.changedTouches[0].clientX - this.start.x;
    const dy = event.changedTouches[0].clientY - this.start.y;
    this.start = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) this.gallery.move(dx < 0 ? 1 : -1);
  }
}
