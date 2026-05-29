import { Component, input, signal } from '@angular/core';
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
    RouterLinkActive,
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
      lucideChevronRight,
    }),
  ],
})
export class NavMenu {
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
