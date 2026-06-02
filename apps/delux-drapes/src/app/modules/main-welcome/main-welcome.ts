import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputSlider } from '@taiga-ui/kit';
import { NgIconImports } from '../../components/ng-icon-src.directive';

@Component({
  selector: 'app-main-welcome',
  templateUrl: './main-welcome.html',
  styleUrls: ['./main-welcome.scss'],
  imports: [FormsModule, TuiTextfield, TuiInputSlider, NgIconImports],
})
export class MainWelcome {}
