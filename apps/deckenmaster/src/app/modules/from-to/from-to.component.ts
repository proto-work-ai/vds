import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-from-to',
  templateUrl: './from-to.component.html',
  styleUrls: ['./from-to.component.scss'],
})
export class FromToComponent {
  readonly title = input('От идеи до готового потолка');
}
