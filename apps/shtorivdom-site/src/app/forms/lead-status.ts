import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LeadFormDirective } from './lead-form.directive';
import { ContactLinksDirective } from '../contact-links.directive';

@Component({
  selector: 'app-lead-status',
  imports: [ContactLinksDirective],
  templateUrl: './lead-status.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadStatus {
  public readonly lead = input.required<LeadFormDirective>();
}
