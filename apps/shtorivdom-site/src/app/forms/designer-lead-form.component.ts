import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LeadFormComponent } from './lead-form.component';

@Component({
  selector: 'app-designer-lead-form',
  template: `<app-lead-form
    [kind]="'designer'"
    [leadType]="'phone'"
    [showName]="true"
    [showComment]="false"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeadFormComponent],
})
export class DesignerLeadFormComponent {}
