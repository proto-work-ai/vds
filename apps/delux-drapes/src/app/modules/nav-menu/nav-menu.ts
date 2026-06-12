/* eslint-disable @angular-eslint/directive-selector */
import { Component, DestroyRef, Directive, HostListener, inject, input, signal } from '@angular/core';
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
  lucideChevronRight,
  lucideClock4,
  lucideMap,
  lucideNavigation,
} from '@ng-icons/lucide';
import { TuiDataList, TuiDropdown, TuiIcon, TuiPopup, TuiTitle } from '@taiga-ui/core';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { type TuiHandler } from '@taiga-ui/cdk';
import { TuiHeader } from '@taiga-ui/layout';
import { TuiDrawer, TuiTree } from '@taiga-ui/kit';
import { IAppMenuItem } from '../../shared/menu';
import { ScrollLink } from '../../components/scroll-link/scroll-link.directive';
import { injectNavMenu } from '../../model/catalog.service';
import { InviteModalClick } from '../../components/invite-designer/invite-designer-modal';
import { NgIconImports } from '../../components/ng-icon-src.directive';
import { ADDRESS, ADDRESS_LINK } from '../../contacts';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.html',
  styleUrl: 'nav-menu.scss',
  imports: [
    NgIconImports,
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
    RouterLinkActive,
    HlmNavigationMenuImports,
    InviteModalClick,
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
      lucideChevronRight,
      lucideClock4,
      lucideMap,
      lucideNavigation,
    }),
  ],
})
export class NavMenu {
  protected readonly address = inject(ADDRESS);
  protected readonly addressLink = inject(ADDRESS_LINK);
  readonly callSurveyor = input(true);
  protected readonly navMenu = injectNavMenu();
  protected readonly handler: TuiHandler<IAppMenuItem, readonly IAppMenuItem[]> = (item) => item.children || [];
  protected open = signal(false);

  protected onClose(): void {
    this.open.set(false);
  }

  protected onOpen(): void {
    this.open.set(true);
  }
}
