import { Component, input, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCircleArrowRight } from '@ng-icons/lucide';
import { TurnkeySolutionCard } from '../turnkey-solution-card/turnkey-solution-card';

@Component({
  selector: 'app-turnkey-solutions',
  templateUrl: './turnkey-solutions.component.html',
  styleUrls: ['./turnkey-solutions.component.scss'],
  imports: [TurnkeySolutionCard],
  providers: [provideIcons({ lucideCircleArrowRight })],
})
export class TurnkeySolutionsComponent {
  readonly title = input('Готовые решения под ключ');

  protected readonly items = signal([ ] as const);
}
