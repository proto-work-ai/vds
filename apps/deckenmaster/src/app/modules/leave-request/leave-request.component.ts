import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
  imports: [FormsModule, TuiTextfield,],
})
export class LeaveRequestComponent {
  readonly title = input('Оставьте заявку на бесплатный замер потолка специалистом');

  protected value = '';
}
