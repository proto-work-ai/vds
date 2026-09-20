import { RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactLinksDirective } from '../contact-links.directive';

/** Подвал — mockups/site/src/partials/footer.html (шаблон генерирует tools/mockups/site-to-angular.mjs) */
@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ContactLinksDirective],
  host: { class: 'block' },
})
export class SiteFooter {}
