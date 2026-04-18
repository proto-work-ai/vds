import { Component, input } from '@angular/core';
import { injectStretchCeilingsCatalog } from '../../../model/stretch-ceilings.service';
import { StretchCeilingsCatalogCard } from "../stretch-ceilings-catalog-card/stretch-ceilings-catalog-card";
import { RouterLink } from "@angular/router";
import { routePath } from '../../../app.routes';

@Component({
  selector: 'app-stretch-ceilings-catalog-all',
  templateUrl: './stretch-ceilings-catalog-all.html',
  styleUrls: ['./stretch-ceilings-catalog-all.scss'],
  imports: [StretchCeilingsCatalogCard, RouterLink],
})
export class StretchCeilingsCatalogAll {
  readonly title = input('Каталог натяжных потолков');
  protected readonly items = injectStretchCeilingsCatalog();
  protected readonly routePath = routePath;
}
