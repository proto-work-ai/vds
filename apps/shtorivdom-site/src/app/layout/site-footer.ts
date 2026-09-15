import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Подвал — mockups/site/src/partials/footer.html (шаблон генерирует tools/mockups/site-to-angular.mjs) */
@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SiteFooter {}
