import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../components/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactLinksDirective } from '../../contact-links.directive';
import { PartnerLeadFormComponent } from '../../forms/partner-lead-form.component';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/partner/index.html
@Component({
  selector: 'app-partner-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective, ContactLinksDirective, PartnerLeadFormComponent],
})
export class PartnerPage {}
