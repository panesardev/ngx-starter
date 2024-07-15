import { InjectionToken } from '@angular/core';
import { initializeApp as initializeFirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from './app.constants';

const firebase = initializeFirebaseApp(FIREBASE_CONFIG);

export const Auth = new InjectionToken('firebase auth', {
  providedIn: 'root',
  factory: () => getAuth(firebase),
}); 

export const Firestore = new InjectionToken('firebase firestore', {
  providedIn: 'root',
  factory: () => getFirestore(firebase),
}); 