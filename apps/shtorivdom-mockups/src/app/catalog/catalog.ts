import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOCKUPS } from '../mockups';

@Component({
  selector: 'app-mockup-catalog',
  imports: [RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockupCatalog {
  protected readonly mockups = MOCKUPS;
}
