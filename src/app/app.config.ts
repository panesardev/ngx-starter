import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { routes } from './app.routes';
import { FIREBASE_CONFIG } from './app.constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ), 
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
};

const firebase = initializeApp(FIREBASE_CONFIG);

/**
 * Use these injection tokens in inject() for using firestore and authentication
 */

export const FIRESTORE = new InjectionToken('FIRESTORE', {
  providedIn: 'root',
  factory: () => getFirestore(firebase),
});

export const AUTH = new InjectionToken('AUTH', {
  providedIn: 'root',
  factory: () => getAuth(firebase),
});
