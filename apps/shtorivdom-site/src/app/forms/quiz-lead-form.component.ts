import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LeadFormComponent } from './lead-form.component';

@Component({
  selector: 'app-quiz-lead-form',
  template: `<app-lead-form
    [leadType]="'full'"
    [leadDescription]="leadDescription()"
    [showName]="true"
    [submitText]="'Отправить подбор'"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeadFormComponent],
})
export class QuizLeadFormComponent {
  public readonly leadDescription = input('');
}
