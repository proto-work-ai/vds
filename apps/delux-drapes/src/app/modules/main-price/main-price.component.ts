import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputSlider } from '@taiga-ui/kit';
import { NgIconImports } from '../../components/ng-icon-src.directive';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideGift } from '@ng-icons/lucide';

@Component({
  selector: 'app-main-price',
  templateUrl: './main-price.component.html',
  styleUrls: ['./main-price.component.scss'],
  imports: [FormsModule, TuiTextfield, TuiInputSlider, NgIconImports],
  providers: [
    provideIcons({
      lucideCheck,
      lucideGift,
    }),
  ],
})
export class MainPrice {
  
}
