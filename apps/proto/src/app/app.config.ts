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
import { appRoutes } from './app.routes';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  // Use 'override' keyword for newer versions of Angular
  override parse(url: string): UrlTree {
    return super.parse(url.toLowerCase());
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer,
    },
  ],
};
