import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  DefaultUrlSerializer,
  provideRouter,
  UrlSerializer,
  UrlTree,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { appRoutes } from './app.routes';
import { LocationStrategy, TrailingSlashPathLocationStrategy } from '@angular/common';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  // Use 'override' keyword for newer versions of Angular
  override parse(url: string): UrlTree {
    return super.parse(url.toLowerCase());
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    /*
      Cерверы (например, Apache или Nginx) рассматривают пути с завершающими косыми чертами как каталоги, соответствующие каталогу index.html
    */
    { provide: LocationStrategy, useClass: TrailingSlashPathLocationStrategy },
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer,
    },
    provideAnimations(),
    provideEventPlugins(),
  ],
};
