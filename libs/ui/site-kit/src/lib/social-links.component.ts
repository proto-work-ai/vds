import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SITE_ASSETS_URL, SITE_CONTACTS } from './data';

/**
 * Соцсети: footer — квадратная подложка 40px с золотой рамкой (подвал);
 * plain — иконка 36px без подложки (страница контактов).
 */
@Component({
  selector: 'site-social-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex gap-2.5' },
  template: `
    @for (s of links; track s.label) {
      <a target="_blank" rel="noopener" [href]="s.href" [attr.aria-label]="s.label"
        [class]="variant() === 'footer'
          ? 'grid size-10 place-items-center border border-gold/25 transition-colors hover:border-gold'
          : 'grid size-11 place-items-center transition-opacity hover:opacity-75'">
        <img alt="" [src]="assets + 'img/' + s.file" [class]="variant() === 'footer' ? 'size-5' : 'size-9'" />
      </a>
    }
  `,
})
export class SiteSocialLinks {
  readonly variant = input<'footer' | 'plain'>('footer');
  protected readonly assets = inject(SITE_ASSETS_URL);
  protected readonly links = [
    { label: 'Telegram', href: SITE_CONTACTS.telegram, file: 'telegram.svg' },
    { label: 'Max', href: SITE_CONTACTS.max, file: 'max.svg' },
  ];
}
