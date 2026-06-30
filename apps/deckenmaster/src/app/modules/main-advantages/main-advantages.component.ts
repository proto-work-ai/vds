import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-advantages',
  templateUrl: './main-advantages.component.html',
  imports: [FormsModule],
})
export class MainAdvantagesComponent {
  protected readonly items = signal([
    { title: 'Бесплатный выезд замерщика', src: '/icons/banner-icon-1.svg' },
    { title: 'Экологично', src: '/icons/banner-icon-2.svg' },
    { title: 'Изготовление за 1 день, установка за 2 часа', src: '/icons/banner-icon-3.svg' },
    { title: '3 года гарантии на материалы', src: '/icons/banner-icon-4.svg' },
  ]);
}
