import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp, lucidePlus } from '@ng-icons/lucide';
import { AnnotationInputComponent } from '../annotation-input/annotation-input.component';
import { AnnotationViewComponent } from '../annotation-view/annotation-view.component';

@Component({
  selector: 'app-annotation-panel',
  templateUrl: 'annotation-panel.component.html',
  styleUrl: 'annotation-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, AnnotationViewComponent, AnnotationInputComponent, NgIcon],
  providers: [
    provideIcons({
      lucidePlus,
      lucideArrowUp,
    }),
  ],
})
export class AnnotationPanelComponent {
  protected readonly edited = signal(false);

  protected startEdit(): void {
    this.edited.set(true);
  }

  protected cancelEdit(): void {
    this.edited.set(false);
  }
}
