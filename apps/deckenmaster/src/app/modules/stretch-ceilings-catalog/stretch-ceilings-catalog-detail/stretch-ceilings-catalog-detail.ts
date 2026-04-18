import { Component, input } from '@angular/core';
import { IStretchCeiling } from '../../../model/stretch-ceilings.data';

@Component({
  selector: 'app-stretch-ceilings-catalog-detail',
  templateUrl: 'stretch-ceilings-catalog-detail.html',
  styleUrls: ['stretch-ceilings-catalog-detail.scss'],
})
export class StretchCeilingsCatalogDetail {
  readonly title = input('Каталог натяжных потолков');
  readonly item = input.required<IStretchCeiling>();
}
