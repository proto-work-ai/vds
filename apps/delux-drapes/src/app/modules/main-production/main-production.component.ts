import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputRange, TuiInputSlider } from '@taiga-ui/kit';
import { ScrollLink } from "../../components/scroll-link/scroll-link.directive";

@Component({
  selector: 'app-main-production',
  templateUrl: './main-production.component.html',
  styleUrls: ['./main-production.component.scss'],
  imports: [FormsModule, TuiTextfield, TuiInputRange, TuiInputSlider, ScrollLink],
})
export class MainProduction {
  
}
