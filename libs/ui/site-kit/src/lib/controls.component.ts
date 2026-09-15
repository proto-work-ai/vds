import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { SiteIcon } from './icon.component';

/** Бургер мобильного меню: три полоски ↔ крестик по aria-expanded. */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- компонент-атрибут на <button>, имя как у директивы
  selector: 'button[siteBurger]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    class: 'burger px-2.5 py-3.5',
    '[attr.aria-expanded]': 'expanded()',
    '[attr.aria-label]': 'expanded() ? "Закрыть меню" : "Открыть меню"',
    '(click)': 'expanded.set(!expanded())',
  },
  template: '<span></span><span></span><span></span>',
})
export class SiteBurger {
  readonly expanded = model(false);
}

export type SiteArrowDirection = 'prev' | 'next';

/**
 * Стрелки: slider — отзывы (40px, рамка black/10, slate/60);
 * strip — ленты фото и моделей каталога (.cat-arrow, 44px).
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- компонент-атрибут на <button>, имя как у директивы
  selector: 'button[siteArrow]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteIcon],
  host: { type: 'button', '[class]': 'classes()' },
  template: `<site-icon [name]="direction() === 'prev' ? 'chevron-left' : 'chevron-right'" [size]="kind() === 'strip' ? 18 : 15" />`,
})
export class SiteArrow {
  readonly direction = input<SiteArrowDirection, SiteArrowDirection | ''>('next', { alias: 'siteArrow', transform: (v) => v || 'next' });
  readonly kind = input<'slider' | 'strip'>('slider');
  protected readonly classes = computed(() =>
    this.kind() === 'strip'
      ? 'cat-arrow'
      : 'flex size-10 items-center justify-center border border-black/10 text-slate/60 transition-colors hover:border-gold hover:text-gold',
  );
}

/** Точки слайдера отзывов: активная — вытянутая золотая. */
@Component({
  selector: 'site-dots',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex gap-1' },
  template: `
    @for (i of items(); track i) {
      <button type="button" class="px-1 py-4" [attr.aria-label]="label() + ' ' + (i + 1)" [attr.aria-current]="i === index()"
        (click)="index.set(i)">
        <span class="dot block" [class.is-on]="i === index()"></span>
      </button>
    }
  `,
})
export class SiteDots {
  readonly count = input(3);
  readonly label = input('Отзыв');
  readonly index = model(0);
  protected readonly items = computed(() => Array.from({ length: this.count() }, (_, i) => i));
}
