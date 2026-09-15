
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: 'main-menu.component.html',
  styleUrl: 'main-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class MainMenuComponent {
  protected routeConfig: any; //= inject(ROUTE_CONFIG) as IAppRoute;

  protected get children() {
    return this.routeConfig?.children;
  }

  protected isArray(icon: string | string[]) {
    return Array.isArray(icon);
  }
}
