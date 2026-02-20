/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChartPie,
  lucideEllipsis,
  lucideFolder,
  lucideFrame,
  lucideMap,
  lucideShare,
  lucideTrash2,
} from '@ng-icons/lucide';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { IMenuItem } from '../../../common/menu';

@Component({
  selector: 'proto-nav-menu',
  imports: [HlmSidebarImports, NgIcon, RouterLink, HlmDropdownMenuImports],
  providers: [
    provideIcons({
      lucideFrame,
      lucideChartPie,
      lucideMap,
      lucideEllipsis,
      lucideFolder,
      lucideShare,
      lucideTrash2,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-sidebar-group>
      <div hlmSidebarGroupLabel>Studio</div>

      <ul hlmSidebarMenu>
        @for (project of items(); track $index) {
          <li hlmSidebarMenuItem>
            <a hlmSidebarMenuButton [routerLink]="project.url">
              <ng-icon [name]="project.icon" />
              {{ project.title }}
            </a>

            <!-- <button
              hlmSidebarMenuAction
              showOnHover
              [hlmDropdownMenuTrigger]="menu"
              [hlmDropdownMenuTriggerData]="{ $implicit: { project } }"
              [side]="_menuSide()"
              [align]="_menuAlign()"
            >
              <ng-icon name="lucideEllipsis" />
              <span class="sr-only">More</span>
            </button> -->
          </li>
        }
      </ul>
    </hlm-sidebar-group>

    <ng-template #menu let-ctx>
      <hlm-dropdown-menu class="w-48">
        <hlm-dropdown-menu-group>
          <hlm-dropdown-menu-label>{{
            ctx.project.name
          }}</hlm-dropdown-menu-label>
        </hlm-dropdown-menu-group>
        <hlm-dropdown-menu-separator />
        <button hlmDropdownMenuItem>
          <ng-icon name="lucideFolder" />
          View Project
        </button>
        <button hlmDropdownMenuItem>
          <ng-icon name="lucideShare" />
          Share Project
        </button>
        <hlm-dropdown-menu-separator />
        <button hlmDropdownMenuItem>
          <ng-icon name="lucideTrash2" />
          Delete Project
        </button>
      </hlm-dropdown-menu>
    </ng-template>
  `,
})
export class NavMenu {
  public readonly items = input.required<IMenuItem[]>();
}
