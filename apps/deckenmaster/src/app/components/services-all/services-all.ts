import { Component } from '@angular/core';
import { FormImports } from '../form';
import { servicePages } from '../../model/service-pages';

@Component({
  selector: 'app-services-all',
  templateUrl: 'services-all.html',
  styleUrls: ['services-all.scss'],
  imports: [FormImports],
})
export class ServicesAll {
  protected readonly pages = servicePages;
}
