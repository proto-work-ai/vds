import { Component, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-from-to',
  templateUrl: './from-to.component.html',
  styleUrls: ['./from-to.component.scss'],
})
export class FromToComponent {
  readonly title = input('От идеи до готового потолка');

  protected readonly items = signal([
    {
      title: 'Потолок в ванной',
      src: '/img/from-to-1.jpg',
    },
    {
      title: 'Потолок в коридоре',
      src: '/img/from-to-2.jpg',
    },
  ] as const);
}
