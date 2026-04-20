import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectStretchCeilingsCatalog } from '../../../model/stretch-ceilings.service';
import { StretchCeilingsCatalogCard } from '../stretch-ceilings-catalog-card/stretch-ceilings-catalog-card';
import { routePath } from '../../../app.routes';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';

@Component({
  selector: 'app-stretch-ceilings-catalogs',
  templateUrl: './stretch-ceilings-catalogs.html',
  styleUrls: ['./stretch-ceilings-catalogs.scss'],
  imports: [StretchCeilingsCatalogCard, RouterLink, NgIcon],
  providers: [
    provideIcons({
      lucideChevronRight,
    }),
  ],
})
export class StretchCeilingsCatalogs {
  readonly title = input('Каталог натяжных потолков');
  protected readonly items = injectStretchCeilingsCatalog()
  protected readonly routePath = routePath;

}
