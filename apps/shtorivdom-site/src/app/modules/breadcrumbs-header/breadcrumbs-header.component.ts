import { Component, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { NgIconImports } from '@atlas/core';

export interface IBreadcrumbItem {
  title: string;
  link?: string[];
}

@Component({
  selector: 'app-breadcrumbs-header',
  templateUrl: 'breadcrumbs-header.component.html',
  styleUrls: ['breadcrumbs-header.component.scss'],
  imports: [NgIconImports, TuiDataList, TuiDropdown, TuiDataList, TuiDropdown, RouterLink],
  providers: [
    provideIcons({
      lucideChevronRight,
    }),
  ],
})
export class BreadcrumbsHeader {
  readonly items = input.required<IBreadcrumbItem[]>();
}
