import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export function provideFirebase(): EnvironmentProviders {
  return importProvidersFrom(
    provideFirebaseApp(() => initializeApp(config)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  );
}

const config = {
  // firebase config here
};