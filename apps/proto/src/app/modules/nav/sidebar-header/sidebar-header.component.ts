/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCommand,
  lucideMaximize,
  lucideMinimize,
  lucideRefreshCcw,
} from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { data } from './data';
import { NavMain } from './nav-main';
import { NavProjects } from './nav-projects';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';
import { RouterOutlet } from '@angular/router';
import { NavHeaderBreadcrumb } from '../header-breadcrumb/nav-header-breadcrumb.component';
import { NavMenu } from './nav-menu';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon, HlmIconImports } from '@spartan-ng/helm/icon';
import { BrnSelect, BrnSelectImports } from '@spartan-ng/brain/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

@Component({
  selector: 'proto-nav-sidebar-header',
  templateUrl: `sidebar-header.component.html`,
  styleUrl: 'sidebar-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmSidebarImports,
    NavHeaderBreadcrumb,
    HlmSidebarImports,
    HlmButtonImports,
    HlmIconImports,
    BrnSelect,
    NgIcon,
    HlmIcon,
    HlmSidebarImports,
    HlmDropdownMenuImports,
    HlmCollapsibleImports,
    BrnSelectImports,
    HlmSelectImports,
    ReactiveFormsModule,
    HlmSidebarImports,
    HlmButtonImports,
    HlmIconImports,
    NgIcon,
    RouterOutlet,
    NavMain,
    NavUser,
    NavSecondary,
    RouterOutlet,
    NavProjects,
    NavMenu,
  ],
  providers: [
    provideIcons({
      lucideCommand,
      lucideMaximize,
      lucideMinimize,
      lucideRefreshCcw,
    }),
  ],
})
export class NavSidebarHeader {
  public readonly data = data;
  protected readonly schemaOptions = signal([
    { title: 'Public', value: 1 },
    { title: 'Apple', value: 2 },
  ]);
  protected readonly schemaControl = new FormControl(
    this.schemaOptions()[0].value,
  );

  protected readonly menuItems = [
    { title: 'Visualizer', link: '#', icon: '' },
    { title: 'Console', link: '#', icon: '' },
  ];

  protected readonly schemaTables = [
    { title: 'Table1', link: '#', icon: '' },
    { title: 'Table2', link: '#', icon: '' },
  ];

  projects = [{ name: 'Design Engineering', link: '#', icon: 'lucideFrame' }];
}
