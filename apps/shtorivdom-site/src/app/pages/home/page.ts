import { LeadFormComponent } from '../../forms/lead-form.component';
import { DesignerLeadFormComponent } from '../../forms/designer-lead-form.component';
import { RouterLink } from '@angular/router';
import { CounterDirective } from '../../components/reveal.directive';
import { RevealDirective } from '../../components/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactLinksDirective } from '../../contact-links.directive';
import { SITE_FAQ, SiteFaq, SiteBeforeAfter, SiteReviewSlider } from '@shtorivdom/site-kit';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/index.html
@Component({
  selector: 'app-home-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LeadFormComponent,
    DesignerLeadFormComponent,
    SiteBeforeAfter,
    SiteReviewSlider,
    RouterLink,
    CounterDirective,
    RevealDirective,
    SiteFaq,
    ContactLinksDirective,
  ],
})
export class HomePage {
  protected readonly faq = SITE_FAQ;
}
