import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SITE_LOGO_SVG } from './logo-svg';

export type SiteLogoVariant = 'mark' | 'vertical' | 'horizontal' | 'wordmark' | 'full';
export type SiteLogoColor = 'navy' | 'white' | 'cream' | 'gold';

const FILE: Record<SiteLogoVariant, 1 | 2 | 3 | 4 | 5> = { mark: 1, vertical: 2, horizontal: 3, wordmark: 4, full: 5 };
const COLOR: Record<SiteLogoColor, string> = { navy: 'text-navy', white: 'text-white', cream: 'text-cream', gold: 'text-gold' };

/** Логотип: знак (logo-1), вертикальный (logo-2), горизонтальный (logo-3), надпись (logo-4), полный крупный (logo-5). Ширина задаётся снаружи. */
@Component({
  selector: 'site-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block', '[class]': 'colorClass()', '[innerHTML]': 'svg()' },
  template: '',
})
export class SiteLogo {
  readonly variant = input<SiteLogoVariant>('horizontal');
  readonly color = input<SiteLogoColor>('navy');

  private readonly _sanitizer = inject(DomSanitizer);
  protected readonly colorClass = computed(() => COLOR[this.color()]);
  protected readonly svg = computed(() => this._sanitizer.bypassSecurityTrustHtml(SITE_LOGO_SVG[FILE[this.variant()]]));
}
