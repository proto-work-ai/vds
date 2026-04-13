import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { tuiInputPhoneOptionsProvider } from '@taiga-ui/kit';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideAnimations(),
    provideEventPlugins(),
    provideHttpClient(),

    tuiInputPhoneOptionsProvider({
      valueTransformer: {
        fromControlValue: (value) => `+${value}`,
        toControlValue: (value) => value?.slice(2),
      },
    }),
  ],
};
