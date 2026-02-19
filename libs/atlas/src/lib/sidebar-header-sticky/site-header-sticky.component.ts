/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmBreadCrumbImports } from '@spartan-ng/helm/breadcrumb';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

@Component({
  selector: 'app-site-header-sticky',
  templateUrl: 'site-header-sticky.component.html',
  styleUrl: 'site-header-sticky.component.scss',
  imports: [
    HlmSidebarImports,
    HlmSeparatorImports,
    HlmBreadCrumbImports,
    HlmInputGroupImports,
    NgIcon,
  ],
  providers: [provideIcons({ lucideSearch })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeaderSticky {}
