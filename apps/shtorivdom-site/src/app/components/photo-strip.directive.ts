import { afterNextRender, DestroyRef, Directive, ElementRef, inject, signal } from '@angular/core';

@Directive({ selector: '[data-strip]', exportAs: 'photoStrip', host: { '(scroll)': 'sync()' } })
export class PhotoStripDirective {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly destroy = inject(DestroyRef);
  public readonly atStart = signal(true);
  public readonly atEnd = signal(false);

  constructor() {
    afterNextRender(() => {
      const observer = new ResizeObserver(() => this.sync());
      observer.observe(this.element);
      this.sync();
      this.destroy.onDestroy(() => observer.disconnect());
    });
  }

  public move(direction: number): void {
    this.element.scrollBy({ left: direction * this.element.clientWidth * 0.9, behavior: 'smooth' });
  }

  protected sync(): void {
    this.atStart.set(this.element.scrollLeft <= 2);
    this.atEnd.set(
      this.element.scrollLeft + this.element.clientWidth >= this.element.scrollWidth - 2,
    );
  }
}
