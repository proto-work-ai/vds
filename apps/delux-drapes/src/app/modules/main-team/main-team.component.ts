import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputRange, TuiInputSlider } from '@taiga-ui/kit';
import { ScrollLink } from "../../components/scroll-link/scroll-link.directive";

@Component({
  selector: 'app-main-team',
  templateUrl: './main-team.component.html',
  styleUrls: ['./main-team.component.scss'],
  imports: [FormsModule, TuiTextfield, TuiInputRange, TuiInputSlider, ScrollLink],
})
export class MainTeam { 
}
