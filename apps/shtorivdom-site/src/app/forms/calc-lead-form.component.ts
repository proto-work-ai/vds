import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LeadFormComponent } from './lead-form.component';

@Component({
  selector: 'app-calc-lead-form',
  template: `<app-lead-form
    [leadType]="'full'"
    [showName]="true"
    [calculationSummary]="calculationSummary()"
    [submitText]="'Отправить расчёт дизайнеру'"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeadFormComponent],
})
export class CalcLeadFormComponent {
  public readonly calculationSummary = input('');
}
