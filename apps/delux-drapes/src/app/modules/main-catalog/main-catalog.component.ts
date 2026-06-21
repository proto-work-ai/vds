import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputSlider } from '@taiga-ui/kit';
import { RouterLink } from '@angular/router';
import { catalogPagesAll } from '../../model/catalog/catalog.data';
import { ScrollLink } from '../../components/scroll-link/scroll-link.directive';

@Component({
  selector: 'app-main-catalog',
  templateUrl: './main-catalog.component.html',
  styleUrls: ['./main-catalog.component.scss'],
  imports: [FormsModule, TuiTextfield, TuiInputSlider, RouterLink, ScrollLink],
})
export class MainCatalog {
  protected readonly CATALOG = catalogPagesAll;
}
