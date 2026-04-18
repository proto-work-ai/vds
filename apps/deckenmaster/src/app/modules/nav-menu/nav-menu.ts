import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronDown,
  lucideLink,
  lucideCircle,
  lucideCheck,
  lucideInfo,
  lucidePhone,
  lucideMenu,
  lucideX,
} from '@ng-icons/lucide';
import { TuiDataList, TuiDropdown, TuiIcon, TuiPopup, TuiTitle } from '@taiga-ui/core';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { RouterLink } from '@angular/router';
import { type TuiHandler } from '@taiga-ui/cdk';
import { TuiHeader } from '@taiga-ui/layout';
import { injectStretchCeilingGroupMenu, injectStretchCeilingsCatalog } from '../../model/stretch-ceilings.service';
import { IAppMenuItem } from '../../shared/menu';
import { TuiDrawer, TuiTree } from '@taiga-ui/kit';
import { ScrollLink } from '../../components/scroll-link/scroll-link.directive';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.html',
  styleUrl: 'nav-menu.scss',
  imports: [
    NgIcon,
    TuiDataList,
    TuiDropdown,
    TuiDrawer,
    TuiPopup,
    TuiTitle,
    TuiHeader,
    ScrollLink,
    RouterLink,
    TuiTree,
    TuiIcon,
    HlmIconImports,
    HlmNavigationMenuImports,
  ],
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideLink,
      lucideCircle,
      lucideCheck,
      lucideInfo,
      lucidePhone,
      lucideMenu,
      lucideX,
    }),
  ],
})
export class NavMenu {
  protected readonly items = injectStretchCeilingsCatalog();

  private readonly catalogMenu = injectStretchCeilingGroupMenu(['/', 'catalog']);

  protected readonly navMenu = signal<IAppMenuItem[]>([
    {
      title: 'Каталог',
      children: this.catalogMenu,
    },
    {
      title: 'Цены',
      link: ['/', 'price'],
    },
    {
      title: 'Контакты',
      link: ['/', 'contacts'],
    },
    {
      title: 'О компании',
      link: ['/', 'about'],
    },
  ]);

  protected readonly handler: TuiHandler<IAppMenuItem, readonly IAppMenuItem[]> = (item) => item.children || [];

  protected open = signal(false);

  protected onClose(): void {
    this.open.set(false);
  }

  protected onOpen(): void {
    this.open.set(true);
  }
}

/*
{
  title: 'Alert Dialog',
  description: 'A modal dialog that interrupts the user with important content and expects a response.',
  link: '/components/alert-dialog',
},
{
  title: 'Hover Card',
  description: 'For sighted users to preview content available behind a link.',
  link: '/components/hover-card',
},
{
  title: 'Progress',
  description: 'Displays an indicator showing the completion progress of a task.',
  link: '/components/progress',
},
{
  title: 'Scroll Area',
  description: 'Visually or semantically separates content.',
  link: '/components/scroll-area',
},
{
  title: 'Tabs',
  description: 'A set of layered content panels displayed one at a time.',
  link: '/components/tabs',
},
{
  title: 'Tooltip',
  description: 'A popup that displays information on hover or focus.',
  link: '/components/tooltip',
},
*/
