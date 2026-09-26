import { afterNextRender, DestroyRef, Directive, ElementRef, inject, signal } from '@angular/core';

@Directive({
  selector: '[data-strip]',
  exportAs: 'photoStrip',
  host: {
    '(scroll)': 'sync()',
    '(pointerdown)': 'swipeStart($event)',
    '(pointerup)': 'swipeEnd($event)',
    '(pointercancel)': 'swipeCancel()',
  },
})
export class PhotoStripDirective {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly destroy = inject(DestroyRef);
  private swipe: { id: number; x: number; y: number } | null = null;
  private suppressClick = false;
  private suppressClickTimer?: ReturnType<typeof setTimeout>;
  public readonly atStart = signal(true);
  public readonly atEnd = signal(false);

  constructor() {
    const stopClickAfterSwipe = (event: MouseEvent): void => {
      if (!this.suppressClick) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      this.suppressClick = false;
    };
    this.element.addEventListener('click', stopClickAfterSwipe, true);

    afterNextRender(() => {
      const observer = new ResizeObserver(() => this.sync());
      observer.observe(this.element);
      this.sync();
      this.destroy.onDestroy(() => observer.disconnect());
    });
    this.destroy.onDestroy(() => {
      clearTimeout(this.suppressClickTimer);
      this.element.removeEventListener('click', stopClickAfterSwipe, true);
    });
  }

  public move(direction: number): void {
    this.element.scrollBy({ left: direction * this.element.clientWidth * 0.9, behavior: 'smooth' });
  }

  protected swipeStart(event: PointerEvent): void {
    if (event.pointerType === 'mouse') return;
    this.swipe = { id: event.pointerId, x: event.clientX, y: event.clientY };
    this.element.setPointerCapture?.(event.pointerId);
  }

  protected swipeEnd(event: PointerEvent): void {
    if (!this.swipe || event.pointerId !== this.swipe.id) return;
    const dx = event.clientX - this.swipe.x;
    const dy = event.clientY - this.swipe.y;
    this.swipe = null;
    if (Math.abs(dx) <= 40 || Math.abs(dx) <= Math.abs(dy)) return;

    event.preventDefault();
    this.suppressClick = true;
    clearTimeout(this.suppressClickTimer);
    this.suppressClickTimer = setTimeout(() => {
      this.suppressClick = false;
    }, 300);
    this.move(dx < 0 ? 1 : -1);
  }

  protected swipeCancel(): void {
    this.swipe = null;
  }

  protected sync(): void {
    this.atStart.set(this.element.scrollLeft <= 2);
    this.atEnd.set(
      this.element.scrollLeft + this.element.clientWidth >= this.element.scrollWidth - 2,
    );
  }
}
