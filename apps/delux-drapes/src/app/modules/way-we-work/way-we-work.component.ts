/* eslint-disable @angular-eslint/directive-selector */
import { Component } from '@angular/core';
import { InviteModalClick } from '../../components/invite-designer/invite-designer-modal';
import { NgIconImports } from '../../components/ng-icon-src.directive';

@Component({
  selector: 'app-way-we-work',
  templateUrl: './way-we-work.component.html',
  styleUrls: ['./way-we-work.component.scss'],
  imports: [NgIconImports, InviteModalClick],
})
export class WayWeWorkComponent {}
