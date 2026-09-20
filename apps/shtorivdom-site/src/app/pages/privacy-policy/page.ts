import { RouterLink } from '@angular/router';
import { LeadStatus } from '../../forms/lead-status';
import { RevealDirective } from '../../components/reveal.directive';
import { DeferDirective } from '../../components/defer.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiCheckbox, TuiInput, TuiTextfield } from '@taiga-ui/core';
import { TuiInputPhone, TuiTextarea } from '@taiga-ui/kit';
import { ContactLinksDirective } from '../../contact-links.directive';
import { LeadFormDirective } from '../../forms/lead-form.directive';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/privacy-policy/index.html
@Component({
  selector: 'app-privacy-policy-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    LeadStatus,
    RevealDirective,
    DeferDirective,
    ReactiveFormsModule,
    TuiTextfield,
    TuiInput,
    TuiInputPhone,
    TuiTextarea,
    TuiCheckbox,
    LeadFormDirective,
    ContactLinksDirective,
  ],
})
export class PrivacyPolicyPage {}
