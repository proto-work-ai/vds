import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LeadFormComponent } from './lead-form.component';

@Component({
  selector: 'app-partner-lead-form',
  template: `<app-lead-form [leadType]="'full'" [showName]="true" [showCity]="true" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeadFormComponent],
})
export class PartnerLeadFormComponent {}
