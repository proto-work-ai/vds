 
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendar,
  lucideChartPie,
  lucideChevronDown,
  lucideChevronRight,
  lucideChevronUp,
  lucideEllipsis,
  lucideFrame,
  lucideHouse,
  lucideInbox,
  lucideLifeBuoy,
  lucideMap,
  lucideSearch,
  lucideSend,
  lucideSettings,
  lucideCode,
  lucideTable2,
} from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import {
  HlmSidebarImports,
  provideHlmSidebarConfig,
} from '@spartan-ng/helm/sidebar';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-sidebar',
  styleUrl: 'nav-sidebar.component.scss',
  templateUrl: 'nav-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmSidebarImports,
    HlmDropdownMenuImports,
    HlmCollapsibleImports,
    BrnSelectImports,
    HlmSelectImports,
    ReactiveFormsModule,
    NgIcon,
    HlmIcon,
  ],
  providers: [
    provideIcons({
      lucideHouse,
      lucideInbox,
      lucideCalendar,
      lucideSearch,
      lucideSettings,
      lucideChevronDown,
      lucideLifeBuoy,
      lucideSend,

      lucideFrame,
      lucideChartPie,
      lucideMap,
      lucideEllipsis,
      lucideChevronRight,
      lucideCode,
      lucideTable2,
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

    provideIcons({ lucideChevronUp, lucideChevronDown }),
  ],
})
export class NavSidebar {
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
