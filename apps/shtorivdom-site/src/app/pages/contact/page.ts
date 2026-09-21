import { LeadFormComponent } from '../../forms/lead-form.component';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../components/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactLinksDirective } from '../../contact-links.directive';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/contact/index.html
@Component({
  selector: 'app-contact-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeadFormComponent, RouterLink, RevealDirective, ContactLinksDirective],
})
export class ContactPage {}
