import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-types',
  templateUrl: './work-types.component.html',
  styleUrls: ['./work-types.component.scss']
})
export class WorkTypesComponent {
  readonly title = input('ВЫПОЛНЯЕМ ВСЕ ВИДЫ НАТЯЖНЫХ ПОТОЛКОВ');
}
