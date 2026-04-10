import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-application',
  templateUrl: './form-application.component.html',
  styleUrls: ['./form-application.component.scss']
})
export class FormApplicationComponent {
  readonly title = input('Оставьте заявку');
}
