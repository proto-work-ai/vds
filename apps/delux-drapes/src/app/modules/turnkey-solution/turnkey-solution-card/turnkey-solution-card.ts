import { Component, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleArrowRight } from '@ng-icons/lucide';

@Component({
  selector: 'app-turnkey-solution-card',
  templateUrl: './turnkey-solution-card.html',
  styleUrls: ['./turnkey-solution-card.scss'],
  imports: [NgIcon],
  providers: [provideIcons({ lucideCircleArrowRight })],
})
export class TurnkeySolutionCard {
  readonly item = input.required<any>();
}
