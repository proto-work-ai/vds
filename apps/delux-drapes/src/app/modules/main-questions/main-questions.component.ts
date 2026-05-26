import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTextfield, TuiExpand } from '@taiga-ui/core';
import { TuiInputSlider, TuiAccordion } from '@taiga-ui/kit';
import { ScrollLink } from "../../components/scroll-link/scroll-link.directive";
import { IsPlatformBrowserDirective } from '../../components/is-platform-browser.directive';

@Component({
  selector: 'app-main-questions',
  templateUrl: './main-questions.component.html',
  styleUrls: ['./main-questions.component.scss'],
  imports: [FormsModule, TuiTextfield, IsPlatformBrowserDirective, TuiInputSlider, TuiExpand, TuiAccordion, ScrollLink],
})
export class MainQuestions { 
}
