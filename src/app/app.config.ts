import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebase } from './providers/firebase.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ), 
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideFirebase(),
  ],
};
