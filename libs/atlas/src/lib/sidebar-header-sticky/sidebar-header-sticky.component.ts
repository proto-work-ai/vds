/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCommand } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { data } from './data';
import { NavMain } from './nav-main';
import { NavProjects } from './nav-projects';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';

@Component({
  selector: 'app-sidebar-header-sticky',
  templateUrl: `sidebar-header-sticky.component.html`,
  styleUrl: 'sidebar-header-sticky.component.scss',
  providers: [provideIcons({ lucideCommand })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmSidebarImports,
    NgIcon,
    NavMain,
    NavProjects,
    NavUser,
    NavSecondary,
  ],
})
export class SidebarHeaderSticky {
  public readonly data = data;
}
