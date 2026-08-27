/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideRefreshCcw, lucideSearch } from '@ng-icons/lucide';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { appLogo } from '../../../common/icons';

@Component({
  selector: 'proto-nav-header-breadcrumb',
  templateUrl: 'nav-header-breadcrumb.component.html',
  styleUrl: 'nav-header-breadcrumb.component.scss',
  imports: [
    HlmSidebarImports,
    HlmSeparatorImports,
    HlmBreadcrumbImports,
    HlmInputGroupImports,
    NgIcon,
    HlmIcon,
  ],
  providers: [
    provideIcons({
      lucideSearch,
      appLogo,
      lucideRefreshCcw,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavHeaderBreadcrumb {}
