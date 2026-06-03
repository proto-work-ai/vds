import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputSlider } from '@taiga-ui/kit';
import { ScrollLink } from '../../components/scroll-link/scroll-link.directive';
import { InviteModalClick } from '../../components/invite-designer/invite-designer-modal';

@Component({
  selector: 'app-main-about',
  templateUrl: './main-about.component.html',
  styleUrls: ['./main-about.component.scss'],
  imports: [FormsModule, TuiTextfield, InviteModalClick, TuiInputSlider, ScrollLink],
})
export class MainAbout {}
