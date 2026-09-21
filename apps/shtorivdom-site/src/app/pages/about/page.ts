import { LeadFormComponent } from '../../forms/lead-form.component';
import { RouterLink } from '@angular/router';
import { CounterDirective } from '../../components/reveal.directive';
import { RevealDirective } from '../../components/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactLinksDirective } from '../../contact-links.directive';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/about/index.html
@Component({
  selector: 'app-about-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LeadFormComponent,
    RouterLink,
    CounterDirective,
    RevealDirective,
    ContactLinksDirective,
  ],
})
export class AboutPage {}
