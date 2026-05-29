import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputRange, TuiInputSlider } from '@taiga-ui/kit';
import { RouterLink } from '@angular/router';
import { catalogPagesAll } from '../../model/catalog.data';

@Component({
  selector: 'app-main-catalog',
  templateUrl: './main-catalog.component.html',
  styleUrls: ['./main-catalog.component.scss'],
  imports: [FormsModule, TuiTextfield, TuiInputSlider, RouterLink, TuiInputRange],
})
export class MainCatalog {
  protected readonly CATALOG = catalogPagesAll;
}
