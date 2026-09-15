import { LocationStrategy, TrailingSlashPathLocationStrategy } from '@angular/common';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { SITE_ASSETS_URL } from '@shtorivdom/site-kit';
import { appRoutes } from './app.routes';
import { provideSeo } from './seo';

export const appConfig: ApplicationConfig = {
  providers: [
    // Страницы пререндерятся в папки с index.html — адреса со слешем в конце
    { provide: LocationStrategy, useClass: TrailingSlashPathLocationStrategy },
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes, withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })),
    { provide: SITE_ASSETS_URL, useValue: '/assets/' },
    provideSeo(),
  ],
};
