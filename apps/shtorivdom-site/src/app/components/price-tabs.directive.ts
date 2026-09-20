import {
  afterNextRender,
  contentChildren,
  Directive,
  ElementRef,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({ selector: '[data-tabs]' })
export class PriceTabsDirective {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly tabs = contentChildren(
    forwardRef(() => PriceTabDirective),
    { descendants: true },
  );
  public readonly selected = signal('blackout-curtains');

  constructor() {
    afterNextRender(() => this.fromFragment(this.route.snapshot.fragment));
    this.route.fragment
      .pipe(takeUntilDestroyed())
      .subscribe((fragment) => this.fromFragment(fragment));
  }

  public select(key: string): void {
    this.selected.set(key);
    void this.router.navigate([], {
      relativeTo: this.route,
      fragment: key,
      queryParamsHandling: 'preserve',
      replaceUrl: true,
    });
  }

  public move(current: PriceTabDirective, event: KeyboardEvent): void {
    const tabs = this.tabs() as readonly PriceTabDirective[];
    const index = tabs.indexOf(current);
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? tabs.length - 1
          : event.key === 'ArrowRight'
            ? (index + 1) % tabs.length
            : event.key === 'ArrowLeft'
              ? (index - 1 + tabs.length) % tabs.length
              : -1;
    if (next < 0) return;
    event.preventDefault();
    this.select(tabs[next].key);
    tabs[next].element.focus();
  }

  private fromFragment(fragment: string | null): void {
    if (
      fragment &&
      (this.tabs() as readonly PriceTabDirective[]).some((tab) => tab.key === fragment)
    )
      this.selected.set(fragment);
  }
}

@Directive({
  selector: '[data-tab]',
  host: {
    '[attr.aria-selected]': 'tabs.selected() === key',
    '[tabIndex]': 'tabs.selected() === key ? 0 : -1',
    '(click)': 'tabs.select(key)',
    '(keydown)': 'tabs.move(this, $event)',
  },
})
export class PriceTabDirective {
  public readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  public readonly key = this.element.getAttribute('data-tab') ?? '';
  protected readonly tabs = inject(PriceTabsDirective);
}

@Directive({ selector: '[data-tab-panel]', host: { '[hidden]': 'tabs.selected() !== key' } })
export class PricePanelDirective {
  protected readonly key = inject(ElementRef<HTMLElement>).nativeElement.id.replace(/^panel-/, '');
  protected readonly tabs = inject(PriceTabsDirective);
}

export const PRICE_TABS = [PriceTabsDirective, PriceTabDirective, PricePanelDirective] as const;
