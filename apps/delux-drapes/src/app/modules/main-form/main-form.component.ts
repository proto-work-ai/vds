import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInput, TuiCheckbox } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiInputPhone, TuiInputSlider, TuiTextarea } from '@taiga-ui/kit';
import { provideIcons } from '@ng-icons/core';
import { lucideCheckCircle } from '@ng-icons/lucide';
import { markAsSubmit } from '@atlas/core';
import { finalize } from 'rxjs';
import { FormGroupStore } from '../../components/form-store/form-store.directive';
import { IFormData, injectSendMessage } from '../send-service/send.services';
import { NgIconImports } from '../../components/ng-icon-src.directive';
import { FormImports } from '../../components/form';

export function ymDrainingEvent(): void {
  const { ym } = window as any;
  if (ym) {
    ym(108545164, 'reachGoal', 'draining-suspended-ceiling');
  }
}

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
  imports: [
    TuiDataListWrapper,
    FormsModule,
    ReactiveFormsModule,
    TuiInputSlider,
    TuiInputPhone,
    FormGroupStore,
    TuiInput,
    TuiTextarea,
    TuiCheckbox,
    NgIconImports,
    FormImports,
  ],
  providers: [
    provideIcons({
      lucideCheckCircle,
    }),
  ],
})
export class MainForm {
  private readonly sendForm = injectSendMessage(ymDrainingEvent);
  protected readonly form = new FormGroup({
    phone: new FormControl(''),
    description: new FormControl(''),
    checked: new FormControl(true, [Validators.requiredTrue]),
  });

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      this.sendForm(this.form.value as IFormData)
        .pipe(
          finalize(() => {
            this.form.setValue({} as any);
            this.form.markAsUntouched();
          })
        )
        .subscribe();
    }
  }
}
