import { afterNextRender, DestroyRef, Directive, ElementRef, inject, signal } from '@angular/core';

@Directive({ selector: '.reveal', host: { '[class.is-in]': 'visible()' } })
export class RevealDirective {
  protected readonly visible = signal(false);
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly destroy = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.visible.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.visible.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      );
      observer.observe(this.element);
      this.destroy.onDestroy(() => observer.disconnect());
    });
  }
}

@Directive({ selector: '[data-count]', host: { '[textContent]': 'text()' } })
export class CounterDirective {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly target = Number(this.element.getAttribute('data-count'));
  private readonly suffix = this.element.getAttribute('data-suffix') ?? '';
  protected readonly text = signal(this.format(this.target));
  private readonly destroy = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      let frame = 0;
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer.disconnect();
          const start = performance.now();
          const tick = (time: number) => {
            const progress = Math.min(1, (time - start) / 1800);
            this.text.set(this.format(Math.round(this.target * (1 - (1 - progress) ** 3))));
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        },
        { threshold: 0.5 },
      );
      observer.observe(this.element);
      this.destroy.onDestroy(() => {
        observer.disconnect();
        cancelAnimationFrame(frame);
      });
    });
  }

  private format(value: number): string {
    return value.toLocaleString('ru-RU') + this.suffix;
  }
}
