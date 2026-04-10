import { Component, input } from '@angular/core';

@Component({
  selector: 'app-way-we-work',
  templateUrl: './way-we-work.component.html',
  styleUrls: ['./way-we-work.component.scss'],
})
export class WayWeWorkComponent {
  readonly title = input('Этапы сотрудничества');

  protected readonly items = [
    {
      title: 'Звонок или заявка на сайте ',
      text: 'Звонок или заявка на сайте Бесплатный выезд замерщика Договор',
    },
    {
      title: 'Бесплатный выезд замерщика ',
      text: 'Звонок или заявка на сайте Бесплатный выезд замерщика Договор',
    },
    {
      title: 'Договор и 30% предоплата',
      text: 'Для Вашего удобства,заключениедоговора  сразуна объекте',
    },
    {
      title: 'Монтаж от 2-х часов ',
      text: 'Звонок или заявка на сайте Бесплатный выезд замерщика Договор',
    },
    {
      title: 'Уборка на объекте ',
      text: 'Звонок или заявка на сайте Бесплатный выезд замерщика Договор',
    },
  ] as const;
}
