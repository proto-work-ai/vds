/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { RouterOutlet } from '@angular/router';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMaximize,
  lucideMinimize,
  lucideRefreshCcw,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { StudioSidebarSidebar } from "../sidebar-with-navigation/sidebar-with-navigation.component";
import { HlmSeparator, HlmSeparatorImports } from "@spartan-ng/helm/separator";
import { HlmBreadCrumbImports } from '@spartan-ng/helm/breadcrumb';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { SiteHeaderSticky } from '../sidebar-header-sticky/site-header-sticky.component';
import { SidebarHeaderSticky } from '../sidebar-header-sticky/sidebar-header-sticky.component';

@Component({
  selector: 'orm-studio-page',
  templateUrl: './studio-page.component.html',
  styleUrls: ['./studio-page.component.scss'],
  imports: [
    HlmSidebarImports,
    HlmIconImports,
    HlmButtonImports,
    HlmSeparatorImports,
    HlmBreadCrumbImports,
    HlmInputGroupImports,
    SiteHeaderSticky,
    SidebarHeaderSticky,
    RouterOutlet,
    StudioSidebarSidebar,
    HlmSeparator,
    NgIcon,
],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
      lucideRefreshCcw,
    }),
  ],
})
export class StudioPageComponent {}
