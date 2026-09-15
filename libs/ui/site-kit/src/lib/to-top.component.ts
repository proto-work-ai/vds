import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, PLATFORM_ID, signal } from '@angular/core';

/** Кнопка «наверх»: появляется, когда страница прокручена дальше threshold, по клику плавно прокручивает наверх. */
@Component({
  selector: 'site-to-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="to-top" data-to-top aria-label="Наверх" [class.is-on]="shown()" (click)="toTop()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round" aria-hidden="true">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </button>
  `,
})
export class SiteToTop {
  /** Прокрутка страницы в px, после которой кнопка появляется. */
  readonly threshold = input(600);
  /** Показать принудительно (для историй). */
  readonly visible = input(false);

  private readonly win = inject(DOCUMENT).defaultView;
  private readonly scrollY = signal(0);
  protected readonly shown = computed(() => this.visible() || this.scrollY() > this.threshold());

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID)) || !this.win) return;
    const win = this.win;
    const onScroll = () => this.scrollY.set(win.scrollY);
    onScroll();
    win.addEventListener('scroll', onScroll, { passive: true });
    inject(DestroyRef).onDestroy(() => win.removeEventListener('scroll', onScroll));
  }

  protected toTop(): void {
    this.win?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
