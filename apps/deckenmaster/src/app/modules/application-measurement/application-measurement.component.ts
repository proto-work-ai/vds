import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiTooltip } from '@taiga-ui/kit';

@Component({
  selector: 'app-application-measurement',
  templateUrl: './application-measurement.component.html',
  styleUrls: ['./application-measurement.component.scss'],
  imports: [FormsModule, TuiIcon, TuiTextfield, TuiTooltip],
})
export class ApplicationMeasurementComponent {
  readonly title = input('Оставьте заявку на бесплатный замер');

  protected value = '';
}
