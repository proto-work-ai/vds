import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SiteIcon } from './icon.component';

/**
 * Ссылки-кнопки прототипа:
 * more — «Подробнее →» в карточке каталога (золото, 13px);
 * section — «Перейти в раздел …» / «Все цены →» (navy, hover золото);
 * invite — «Пригласить дизайнера» со стрелкой, расширение отступа на hover;
 * back — «← Все модели»;
 * card-dark — «Подробнее» в тёмной карточке коллекции (11px, cream/60);
 * card-light — «Подробнее» в карточке модели карниза (12px, navy/70).
 */
export type SiteTextLinkVariant = 'more' | 'section' | 'invite' | 'back' | 'card-dark' | 'card-light';

const CLASSES: Record<SiteTextLinkVariant, string> = {
  more: 'inline-flex items-center gap-2 text-[12px] font-bold tracking-[.1em] text-gold uppercase transition-opacity hover:opacity-75',
  section: 'inline-flex items-center gap-2 text-[12px] font-bold tracking-[.1em] text-navy uppercase transition-colors hover:text-gold',
  invite: 'group inline-flex items-center gap-3 text-[14px] font-bold tracking-[.12em] text-gold uppercase transition-[gap] duration-300 hover:gap-5',
  back: 'inline-flex items-center gap-2 px-2 py-3.5 text-[12px] font-bold tracking-[.1em] text-navy uppercase transition-colors hover:text-gold',
  'card-dark': 'group inline-flex items-center gap-1.5 text-[12px] tracking-[.2em] text-cream/60 uppercase transition-colors hover:text-gold',
  'card-light': 'group inline-flex items-center gap-2 text-[12px] font-bold tracking-[.2em] text-navy/70 uppercase transition-colors hover:text-gold',
};

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- компонент-атрибут на <a>, имя как у директивы
  selector: 'a[siteTextLink]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteIcon],
  host: { '[class]': 'classes()' },
  template: `
    @if (variant() === 'back') {<span aria-hidden="true">←</span>}
    <ng-content />
    @switch (variant()) {
      @case ('more') {<span aria-hidden="true">→</span>}
      @case ('section') {<span aria-hidden="true">→</span>}
      @case ('invite') {<site-icon name="arrow-right" [size]="16" />}
      @case ('card-dark') {<site-icon name="arrow-right" class="transition-transform duration-300 group-hover:translate-x-1" [size]="14" />}
      @case ('card-light') {<site-icon name="arrow-right" class="transition-transform duration-300 group-hover:translate-x-1" [size]="14"
        />}
    }
  `,
})
export class SiteTextLink {
  readonly variant = input<SiteTextLinkVariant, SiteTextLinkVariant | ''>('more', { alias: 'siteTextLink', transform: (v) => v || 'more' });
  protected readonly classes = computed(() => CLASSES[this.variant()]);
}
