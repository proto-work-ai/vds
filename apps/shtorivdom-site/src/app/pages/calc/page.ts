import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalcComponent } from '../../components/calc.component';

@Component({
  selector: 'app-calc-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CalcComponent],
})
export class CalcPage {}
