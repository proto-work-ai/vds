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

  protected readonly items = signal([
    {
      title: 'Потолок в ванной',
      size: '4м2',
      color: 'Белый',
      canvas: 'MSD',
      texture: 'Глянец',
      price: 5_000,
      src: '/img/turnkey-solutions-1.jpg',
    },
    {
      title: 'Потолок в коридоре',
      size: '4м2',
      color: 'Белый',
      canvas: 'MSD',
      texture: 'Глянец',
      price: 5_000,
      src: '/img/turnkey-solutions-2.jpg',
    },
    {
      title: 'Потолок на кухне',
      size: '4м2',
      color: 'Белый',
      canvas: 'MSD',
      texture: 'Глянец',
      price: 5_000,
      src: '/img/turnkey-solutions-3.jpg',
    },
    {
      title: 'Потолок в коридоре',
      size: '4м2',
      color: 'Белый',
      canvas: 'MSD',
      texture: 'Глянец',
      price: 5_000,
      src: '/img/turnkey-solutions-4.jpg',
    },
  ] as const);
}
