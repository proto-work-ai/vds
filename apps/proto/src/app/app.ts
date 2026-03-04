import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';

@Component({
  selector: 'proto-root',
  templateUrl: 'app.html',
  styleUrl: 'app.scss',
  imports: [RouterModule, TuiRoot],
})
export class App { }
