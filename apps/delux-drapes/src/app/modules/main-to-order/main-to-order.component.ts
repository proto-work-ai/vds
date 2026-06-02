import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputSlider } from '@taiga-ui/kit';
import { ScrollLink } from '../../components/scroll-link/scroll-link.directive';
import { InviteModalClick } from '../../components/invite-designer/invite-designer-modal';

@Component({
  selector: 'app-main-to-order',
  templateUrl: './main-to-order.component.html',
  styleUrls: ['./main-to-order.component.scss'],
  imports: [FormsModule, TuiTextfield, InviteModalClick, TuiInputSlider, ScrollLink],
})
export class MainToOrder {}
