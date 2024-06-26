import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAdditionalUserInfo, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { user as userChanges } from 'rxfire/auth';
import { docData as docChanges } from 'rxfire/firestore';
import { Observable, map, of, switchMap } from 'rxjs';
import { AuthUser, AdditionalUserData, OAuthProviderName } from './auth.interface';
import { createUserData, getAuthProvider } from './auth.utilities';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = getAuth();
  private firestore = getFirestore();

  user$: Observable<AuthUser> = userChanges(this.auth).pipe(
    switchMap(user => {
      if (user) {
        return docChanges(doc(this.firestore, `users/${user.uid}`)).pipe(
          map((data: AdditionalUserData) => ({ ...user, ...data })),
        ) as Observable<AuthUser>;
      }
      else return of(null);
    }),
  );

  async createAccount(email: string, password: string, displayName: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await Promise.all([
      updateProfile(credential.user, { displayName }), 
      this.setUserData(credential.user.uid, createUserData()),
    ]);
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async oAuthLogin(providerName: OAuthProviderName): Promise<void> {
    const provider = getAuthProvider(providerName);
    const credential = await signInWithPopup(this.auth, provider);

    if (getAdditionalUserInfo(credential).isNewUser) {
      await this.setUserData(credential.user.uid, createUserData());
    }
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
  
  async setUserData(uid: string, data: AdditionalUserData): Promise<void> {
    await setDoc(doc(this.firestore, `users/${uid}`), data);
  }
}
