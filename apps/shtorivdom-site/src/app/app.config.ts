import { LocationStrategy, TrailingSlashPathLocationStrategy } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { tuiAssetsPathProvider } from '@taiga-ui/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { SITE_ASSETS_URL } from '@shtorivdom/site-kit';
import { appRoutes } from './app.routes';
import { provideSeo } from './seo';
import { CookieAcceptedService } from '@atlas/form';
import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { tuiInputPhoneOptionsProvider } from '@taiga-ui/kit';
import { provideTaiga } from '@taiga-ui/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // Страницы пререндерятся в папки с index.html — адреса со слешем в конце
    { provide: LocationStrategy, useClass: TrailingSlashPathLocationStrategy },
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    tuiAssetsPathProvider('/assets/taiga-ui/icons'),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
    ),
    { provide: SITE_ASSETS_URL, useValue: '/assets/' },
    provideSeo(),
    provideAppInitializer(() => {
      inject(CookieAcceptedService);
    }),
    provideEventPlugins(),
    provideTaiga(),
    tuiInputPhoneOptionsProvider({
      valueTransformer: {
        fromControlValue: (value) => (value ? `+7${value}` : ''),
        toControlValue: (value) => value?.slice(2),
      },
    }),
  ],
};
