import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type SiteIconName =
  | 'phone' | 'mail' | 'pin' | 'clock' | 'message' | 'user'
  | 'arrow-right' | 'chevron-down' | 'chevron-left' | 'chevron-right'
  | 'plus' | 'minus' | 'zoom' | 'grid' | 'pen' | 'bell' | 'truck';

export const SITE_ICON_NAMES: SiteIconName[] = [
  'phone', 'mail', 'pin', 'clock', 'message', 'user', 'arrow-right', 'chevron-down', 'chevron-left', 'chevron-right',
  'plus', 'minus', 'zoom', 'grid', 'pen', 'bell', 'truck',
];

/** Контурные иконки из разметки прототипа (Lucide), цвет — currentColor. */
@Component({
  selector: 'site-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex shrink-0' },
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" [attr.width]="size()" [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()">
      @switch (name()) {
        @case ('phone') { <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0
            1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2
            0 0 1 22 16.92z" /> }
        @case ('mail') { <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /> }
        @case ('pin') { <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /> }
        @case ('clock') { <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /> }
        @case ('message') { <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> }
        @case ('user') { <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /> }
        @case ('arrow-right') { <path d="M5 12h14M12 5l7 7-7 7" /> }
        @case ('chevron-down') { <path d="m6 9 6 6 6-6" /> }
        @case ('chevron-left') { <path d="m15 18-6-6 6-6" /> }
        @case ('chevron-right') { <path d="m9 18 6-6-6-6" /> }
        @case ('plus') { <path d="M5 12h14M12 5v14" /> }
        @case ('minus') { <path d="M5 12h14" /> }
        @case ('zoom') { <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3M11 8v6M8 11h6" /> }
        @case ('grid') { <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7"
          height="7" /><rect x="14" y="14" width="7" height="7" /> }
        @case ('pen') { <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586"
          /><circle cx="11" cy="11" r="2" /> }
        @case ('bell') { <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M12 2v2" /> }
        @case ('truck') { <path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5"
          cy="18.5" r="2.5" /> }
      }
    </svg>
  `,
})
export class SiteIcon {
  readonly name = input.required<SiteIconName>();
  readonly size = input(20);
  readonly strokeWidth = input(2);
}
