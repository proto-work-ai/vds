import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { mockupById } from '../mockups';

@Component({
  selector: 'app-mockup-viewer',
  imports: [RouterLink],
  templateUrl: './viewer.html',
  styleUrl: './viewer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockupViewer {
  public readonly id = input.required<string>();

  private readonly sanitizer = inject(DomSanitizer);
  protected readonly mockup = computed(() => mockupById(this.id()));
  protected readonly source = computed(() => {
    const mockup = this.mockup();
    return mockup
      ? this.sanitizer.bypassSecurityTrustResourceUrl(`/legacy/${mockup.path}`)
      : undefined;
  });
}
