import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-examples',
  templateUrl: './ceiling-installations.component.html',
  styleUrls: ['./ceiling-installations.component.scss'],
})
export class CeilingInstallationsComponent {
  readonly title = input('Примеры установки матовых потолков');

  protected readonly items = [
    {
      title: 'Матовые натяжные потолки в зале',
      src: '/img/ceiling-installations/ceiling-installations-7.jpg',
    },
    {
      title: 'Точечные светильники в ванной',
      src: '/img/ceiling-installations/ceiling-installations-5.jpg',
    },
    // {
    //   title: 'Глянцевый натяжной потолок в спальне',
    //   src: '/img/ceiling-installations/ceiling-installations-3.jpg',
    // },
    {
      title: 'Световые линии в детской',
      src: '/img/ceiling-installations/ceiling-installations-4.jpg',
    },
    // {
    //   title: '',
    //   src: '/img/ceiling-installations/ceiling-installations-2.jpg',
    // },
    // {
    //   title: '',
    //   src: '/img/ceiling-installations/ceiling-installations-6.jpg',
    // },
    // {
    //   title: 'Матовые натяжные потолки в зале',
    //   src: '/img/ceiling-installations/ceiling-installations-7.jpg',
    // },
    {
      title: 'Световые линии в коридоре',
      src: '/img/ceiling-installations/ceiling-installations-8.jpg',
    },
  ] as const;
}
