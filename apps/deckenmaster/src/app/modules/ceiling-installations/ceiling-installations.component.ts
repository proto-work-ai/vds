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
      title: 'Матовые натяжные потолки на кухню',
      src: '/ceiling-installations/ceiling-installations-1.jpg',
    },
    {
      title: 'Матовый натяжной потолок в ванной',
      src: '/ceiling-installations/ceiling-installations-5.jpg',
    },
    // {
    //   title: 'Глянцевый натяжной потолок в спальне',
    //   src: '/ceiling-installations/ceiling-installations-3.jpg',
    // },
    {
      title: 'Матовые натяжные потолки в детской',
      src: '/ceiling-installations/ceiling-installations-4.jpg',
    },
    // {
    //   title: '',
    //   src: '/ceiling-installations/ceiling-installations-2.jpg',
    // },
    // {
    //   title: '',
    //   src: '/ceiling-installations/ceiling-installations-6.jpg',
    // },
    // {
    //   title: 'Матовые натяжные потолки в зале',
    //   src: '/ceiling-installations/ceiling-installations-7.jpg',
    // },
    {
      title: 'Матовые натяжные потолки в коридоре',
      src: '/ceiling-installations/ceiling-installations-8.jpg',
    },
  ] as const;
}
