import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp, lucidePlus } from '@ng-icons/lucide';

@Component({
  selector: 'app-annotation-view',
  templateUrl: 'annotation-view.component.html',
  styleUrl: 'annotation-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgIcon],
  providers: [
    provideIcons({
      lucidePlus,
      lucideArrowUp,
    }),
  ],
})
export class AnnotationViewComponent {}
