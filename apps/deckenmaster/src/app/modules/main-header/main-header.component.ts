import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePhone } from '@ng-icons/lucide';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  imports: [NgIcon, RouterLink],
  providers: [
    provideIcons({
      lucidePhone,
    }),
  ],
})
export class MainHeaderComponent {}
