import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { provideHttpClient } from '@angular/common/http';
import { tuiInputPhoneOptionsProvider } from '@taiga-ui/kit';
import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';
import { provideAnimations } from '@angular/platform-browser/animations';

import { appRoutes } from './app.routes';
import { provideTaiga } from '@taiga-ui/core';
import { provideYConfig, YConfig } from 'angular-yandex-maps-v3';
import { VAR_YANDEX_KEY } from './contacts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideAnimations(),
    provideEventPlugins(),
    provideHttpClient(),
    provideTaiga(),
    tuiInputPhoneOptionsProvider({
      valueTransformer: {
        fromControlValue: (value) => `+${value}`,
        toControlValue: (value) => value?.slice(2),
      },
    }),
    {
      provide: GALLERY_CONFIG,
      useValue: {
        thumbs: true,
        autoHeight: true,
        imageSize: 'cover',
        thumbPosition: 'bottom',
      } satisfies GalleryConfig,
    },
    provideYConfig({
      apikey: VAR_YANDEX_KEY,
    } satisfies YConfig),
  ],
};
