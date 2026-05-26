import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield, TuiInput, TuiCheckbox } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiInputPhone, TuiInputSlider, TuiTextarea } from '@taiga-ui/kit';
import { FormStore } from '../../components/form-store/form-store.directive';
import { IsPlatformBrowserDirective } from '../../components/is-platform-browser.directive';

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
    FormStore,
    TuiInput,
    TuiTextarea,
    TuiCheckbox,
    IsPlatformBrowserDirective,
  ],
})
export class MainForm {
  protected readonly form = new FormGroup({
    phone: new FormControl(''),
    description: new FormControl(''),
    checked: new FormControl(false),
  });

  protected formSubmit() {}
}
