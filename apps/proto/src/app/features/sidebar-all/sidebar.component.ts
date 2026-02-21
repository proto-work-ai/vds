/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendar,
  lucideChartPie,
  lucideChevronDown,
  lucideChevronRight,
  lucideEllipsis,
  lucideFrame,
  lucideHouse,
  lucideInbox,
  lucideLifeBuoy,
  lucideMap,
  lucideSearch,
  lucideSend,
  lucideSettings,
} from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import {
  HlmSidebarImports,
  provideHlmSidebarConfig,
} from '@spartan-ng/helm/sidebar';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { appLogo } from '../../common/icons';

@Component({
  selector: 'app-sidebar',
  styleUrl: 'sidebar.component.scss',
  templateUrl: 'sidebar.component.html',
  imports: [
    HlmSidebarImports,
    HlmDropdownMenuImports,
    HlmCollapsibleImports,
    NgIcon,
    HlmIcon,
  ],
  providers: [
    provideIcons({
      appLogo,
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
      lucideChevronRight 
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
export class AppSidebar {
  protected readonly _items = [
    {
      title: 'Home',
      link: '#',
      icon: 'lucideHouse',
    },
    {
      title: 'Inbox',
      link: '#',
      icon: 'lucideInbox',
    },
    {
      title: 'Calendar',
      link: '#',
      icon: 'lucideCalendar',
    },
    {
      title: 'Search',
      link: '#',
      icon: 'lucideSearch',
    },
    {
      title: 'Settings',
      link: '#',
      icon: 'lucideSettings',
    },
  ];

  projects = [
    { name: 'Design Engineering', link: '#', icon: 'lucideFrame' },
    { name: 'Sales & Marketing', link: '#', icon: 'lucideChartPie' },
    { name: 'Travel', link: '#', icon: 'lucideMap' },
    { name: 'Support', link: '#', icon: 'lucideLifeBuoy' },
    { name: 'Feedback', link: '#', icon: 'lucideSend' },
  ];

  protected readonly items = [
    {
      title: 'Getting Started',
      items: [{ title: 'Installation' }, { title: 'Project Structure' }],
    },
    {
      title: 'Building Your Application',
      items: [
        { title: 'Routing' },
        { title: 'Data Fetching', isActive: true },
        { title: 'Rendering' },
        { title: 'Caching' },
        { title: 'Styling' },
        { title: 'Optimizing' },
        { title: 'Configuring' },
        { title: 'Testing' },
        { title: 'Authentication' },
        { title: 'Deploying' },
        { title: 'Upgrading' },
        { title: 'Examples' },
      ],
    },
    {
      title: 'API Reference',
      items: [
        { title: 'Components' },
        { title: 'File Conventions' },
        { title: 'Functions' },
        { title: 'next.config.js Options' },
        { title: 'CLI' },
        { title: 'Edge Runtime' },
      ],
    },
    {
      title: 'Architecture',
      items: [
        { title: 'Accessibility' },
        { title: 'Fast Refresh' },
        { title: 'Next.js Compiler' },
        { title: 'Supported Browsers' },
        { title: 'Turbopack' },
      ],
    },
  ];

protected readonly collapsibleItems = [
    {
      title: 'Getting Started',
      defaultOpen: true,
      items: [{ title: 'Installation' }, { title: 'Project Structure' }],
    },
    {
      title: 'Building Your Application',
      defaultOpen: false,
      items: [
        { title: 'Routing' },
        { title: 'Data Fetching', isActive: true },
        { title: 'Rendering' },
        { title: 'Caching' },
        { title: 'Styling' },
        { title: 'Optimizing' },
        { title: 'Configuring' },
        { title: 'Testing' },
        { title: 'Authentication' },
        { title: 'Deploying' },
        { title: 'Upgrading' },
        { title: 'Examples' },
      ],
    },
    {
      title: 'API Reference',
      defaultOpen: false,
      items: [
        { title: 'Components' },
        { title: 'File Conventions' },
        { title: 'Functions' },
        { title: 'next.config.js Options' },
        { title: 'CLI' },
        { title: 'Edge Runtime' },
      ],
    },
    {
      title: 'Architecture',
      defaultOpen: false,
      items: [
        { title: 'Accessibility' },
        { title: 'Fast Refresh' },
        { title: 'Next.js Compiler' },
        { title: 'Supported Browsers' },
        { title: 'Turbopack' },
      ],
    },
  ];
}
