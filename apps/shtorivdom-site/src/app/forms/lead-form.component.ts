import { ChangeDetectionStrategy, Component, input, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LeadFormDirective } from './lead-form.directive';
import { LeadFields } from './lead-fields';
import { LeadStatus } from './lead-status';

@Component({
  selector: 'app-lead-form',
  exportAs: 'leadForm',
  templateUrl: './lead-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, LeadFormDirective, LeadFields, LeadStatus],
})
export class LeadFormComponent {
  private readonly directive = viewChild.required(LeadFormDirective);
  public readonly kind = input('');
  public readonly leadType = input<'phone' | 'full' | ''>('');
  public readonly orderModel = input('');
  public readonly leadDescription = input('');
  public readonly calculationSummary = input('');
  public readonly showName = input(false);
  public readonly showCity = input(false);
  public readonly submitText = input('Отправить');

  public chooseModel(model: string): void {
    this.directive().chooseModel(model);
  }
}
