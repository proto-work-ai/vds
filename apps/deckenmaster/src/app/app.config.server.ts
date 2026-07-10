import { mergeApplicationConfig, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { provideUniversal } from '@ng-web-apis/universal';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

/*
  https://github.com/taiga-family/ng-web-apis/blob/main/libs/universal/README.md
*/
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideHttpClient(withFetch()),
    provideUniversal(),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
