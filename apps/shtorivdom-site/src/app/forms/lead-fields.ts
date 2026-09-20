import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TuiCheckbox, TuiTextfield } from '@taiga-ui/core';
import { TuiInputPhone, TuiTextarea } from '@taiga-ui/kit';
import { DeferDirective } from '../components/defer.component';

@Component({
  selector: 'app-lead-fields',
  templateUrl: './lead-fields.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    TuiTextfield,
    TuiInputPhone,
    TuiTextarea,
    TuiCheckbox,
    DeferDirective,
  ],
})
export class LeadFields {
  public readonly form = input.required<FormGroup>();
}
