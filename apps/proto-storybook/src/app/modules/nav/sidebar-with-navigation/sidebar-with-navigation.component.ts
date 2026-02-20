/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMaximize,
  lucideMinimize,
  lucideRefreshCcw,
} from '@ng-icons/lucide';
import { HlmIcon, HlmIconImports } from '@spartan-ng/helm/icon';
import {
  HlmSidebarImports,
  provideHlmSidebarConfig,
} from '@spartan-ng/helm/sidebar';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NavMain } from '../sidebar-header/nav-main';
import { NavSecondary } from '../sidebar-header/nav-secondary';
import { NavUser } from '../sidebar-header/nav-user';
import { data } from '../sidebar-header/data';
import { appLogo } from '../../../common/icons';

@Component({
  selector: 'proto-sidebar-with-navigation',
  styleUrl: 'sidebar-with-navigation.component.scss',
  templateUrl: 'sidebar-with-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmIcon,
    HlmSidebarImports,
    HlmDropdownMenuImports,
    HlmCollapsibleImports,
    BrnSelectImports,
    HlmSelectImports,
    ReactiveFormsModule,
    RouterOutlet,
    NgIcon,
    HlmIcon,
    HlmSidebarImports,
    HlmButtonImports,
    HlmIconImports,
    NavMain,
    NavSecondary,
    NavUser,
  ],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
      lucideRefreshCcw,
      appLogo,
    }),
    provideHlmSidebarConfig({
      sidebarWidth: '16rem',
      sidebarWidthMobile: '18rem',
      sidebarWidthIcon: '3rem',
      sidebarCookieName: 'sidebar_state',
      sidebarCookieMaxAge: 60 * 60 * 24 * 7,
      sidebarKeyboardShortcut: 'b',
      mobileBreakpoint: '768px',
    }),
  ],
})
export class SidebarWithNavigation {
  public readonly data = data;
  protected readonly schemaOptions = signal([
    { title: 'Public', value: 1 },
    { title: 'Apple', value: 2 },
  ]);
  protected readonly schemaControl = new FormControl(
    this.schemaOptions()[0].value,
  );

  protected readonly menuItems = [
    { title: 'Visualizer', url: '#', icon: '' },
    { title: 'Console', url: '#', icon: '' },
  ];

  protected readonly schemaTables = [
    { title: 'Table1', url: '#', icon: '' },
    { title: 'Table2', url: '#', icon: '' },
  ];

  projects = [{ name: 'Design Engineering', url: '#', icon: 'lucideFrame' }];
}
