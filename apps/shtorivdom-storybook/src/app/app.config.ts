import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { appRoutes } from './app.routes';
import { LocationStrategy, TrailingSlashPathLocationStrategy } from '@angular/common';
import { tuiInputPhoneOptionsProvider } from '@taiga-ui/kit';
import { provideTaiga } from '@taiga-ui/core';

export const appConfig: ApplicationConfig = {
  providers: [
    /*
      Cерверы (например, Apache или Nginx) рассматривают пути с завершающими косыми чертами как каталоги, соответствующие каталогу index.html
    */
    { provide: LocationStrategy, useClass: TrailingSlashPathLocationStrategy },
    provideBrowserGlobalErrorListeners(), 
    provideRouter(appRoutes),
    provideAnimations(),
    provideEventPlugins(),
    provideTaiga(),
    tuiInputPhoneOptionsProvider({
      valueTransformer: {
        fromControlValue: (value) => `+${value}`,
        toControlValue: (value) => value?.slice(2),
      },
    }),
  ],
};
