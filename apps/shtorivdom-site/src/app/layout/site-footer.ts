import { RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactLinksDirective } from '../contact-links.directive';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ContactLinksDirective],
  host: { class: 'block' },
})
export class SiteFooter {}
