/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, signal } from '@angular/core';
import { TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { TuiTree } from '@taiga-ui/kit';
import { FormImports } from '../../components/form';
import { LeaveRequestModalClick } from '../../components/leave-request-modal/leave-request-modal';

@Component({
  selector: 'app-ceiling-events',
  templateUrl: './ceiling-events.component.html',
  styleUrls: ['./ceiling-events.component.scss'],
  imports: [
    TuiDataList,
    TuiDropdown,
    TuiTree,
    HlmIconImports,
    HlmNavigationMenuImports,
    FormImports,
    LeaveRequestModalClick,
  ],
})
export class CeilingEventsComponent {
  protected readonly events = signal([
    {
      title: 'Новоселам скидка 10%',
      description: 'Закажите натяжной потолок и получите скидку 10% на пвх-полотно',
      image: '/img/events/1.jpg',
    },
    {
      title: 'Скидка на простые потолки ПВХ 10% ',
      description: 'При заказе монтажа во всей квартире',
      image: '/img/events/2.jpg',
    },
    {
      title: 'Скидка на потолок в детской 10%',
      description: 'Закажите натяжной потолок в детской комнате и получите скидку 5%',
      image: '/img/events/3.jpg',
    },
    {
      title: 'Пенсионерам скидка 10%',
      description: 'Специальная скидка 10% по пенсионному удостоверению',
      image: '/img/events/4.jpg',
    },
    // {
    //   title: '6 светильник в подарок',
    //   description: 'Закажите натяжной потолок и каждый 6 светильник будет бесплатно',
    //   image: '/img/events/1.jpg',
    // },
  ] as const);
}
