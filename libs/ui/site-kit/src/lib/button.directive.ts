import { computed, Directive, input } from '@angular/core';

export type SiteButtonAppearance = 'gold' | 'line' | 'outline-navy';
export type SiteButtonSize = 'md' | 'sm';

/**
 * Кнопки прототипа:
 * gold — .btn-gold (основная); line — .btn-line (на тёмном фоне);
 * outline-navy — «Цены» на странице услуг (рамка navy/25).
 * size sm — «Заявка» в шапке (!px-5 !py-2.5); block — на всю ширину (!flex w-full);
 * mobileBlock — max-sm:w-full, как в первых экранах.
 */
@Directive({
  selector: 'a[siteButton], button[siteButton]',
  host: { '[class]': 'classes()' },
})
export class SiteButton {
  /** Атрибут без значения (`<a siteButton>`) приходит пустой строкой — это gold */
  readonly appearance = input<SiteButtonAppearance, SiteButtonAppearance | ''>('gold', { alias: 'siteButton', transform: (v) => v || 'gold' });
  readonly size = input<SiteButtonSize>('md');
  readonly block = input(false);
  readonly mobileBlock = input(false);

  protected readonly classes = computed(() => {
    const list = [
      this.appearance() === 'gold' ? 'btn-gold group' : '',
      this.appearance() === 'line' ? 'btn-line' : '',
      this.appearance() === 'outline-navy'
        ? 'inline-flex items-center justify-center gap-2 rounded-[2px] border border-navy/25 px-6 py-3.5 text-[13px] font-bold tracking-[.1em] uppercase transition-opacity hover:opacity-80'
        : '',
      this.size() === 'sm' ? '!px-5 !py-2.5' : '',
      this.block() ? '!flex w-full' : '',
      this.mobileBlock() ? 'max-sm:w-full' : '',
      'disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
    ];
    return list.filter(Boolean).join(' ');
  });
}
