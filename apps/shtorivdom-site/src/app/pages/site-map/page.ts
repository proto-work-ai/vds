import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { sitePages } from '../../site-pages';

@Component({
  selector: 'app-site-map-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class SiteMapPage {
  protected readonly mainPages = [
    { title: 'Главная', url: '/' },
    { title: 'Каталог', url: '/catalog' },
    { title: 'Цены', url: '/price' },
    { title: 'Услуги', url: '/services' },
    { title: 'Калькулятор штор', url: '/calc' },
    { title: 'Подбор штор', url: '/quiz' },
    { title: 'О салоне', url: '/about' },
    { title: 'Стать партнёром', url: '/partner' },
    { title: 'Контакты', url: '/contact' },
  ];

  protected readonly catalogPages = sitePages
    .filter((page) => page.path?.startsWith('catalog/'))
    .map((page) => {
      const path = page.path ?? '';
      const seo = page.data?.['seo'] as { title?: string } | undefined;

      return {
        title: seo?.title?.replace(/\s*\|\s*Shtorivdom.*$/, '') ?? path,
        url: '/' + path,
      };
    });
}
