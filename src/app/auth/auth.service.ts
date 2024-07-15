import { inject, Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAdditionalUserInfo, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { user as userChanges } from 'rxfire/auth';
import { docData as docChanges } from 'rxfire/firestore';
import { map, Observable, of, switchMap } from 'rxjs';
import { Auth, Firestore } from '../app.firebase';
import { AdditionalUserData, AuthUser, Credentials, OAuthProviderName } from './auth.interface';
import { createUserData, getAuthProvider } from './auth.utilities';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  user$: Observable<AuthUser> = userChanges(this.auth).pipe(
    switchMap(user => {
      if (user) {
        return docChanges(doc(this.firestore, `users/${user.uid}`)).pipe(
          map((data: AdditionalUserData) => ({ ...user, ...data })),
        ) as Observable<AuthUser>;
      }
      return of(null);
    }),
  );

  async createAccount({ email, password, displayName }: Credentials): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await Promise.all([
      updateProfile(credential.user, { displayName }), 
      this.setUserDoc(credential.user.uid, createUserData()),
    ]);
  }

  async login({ email, password }: Credentials): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async oAuthLogin(providerName: OAuthProviderName): Promise<void> {
    const provider = getAuthProvider(providerName);
    const credential = await signInWithPopup(this.auth, provider);

    if (getAdditionalUserInfo(credential).isNewUser) {
      await this.setUserDoc(credential.user.uid, createUserData());
    }
  }

  async resetPassword({ email }: Credentials): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
  
  async setUserDoc(uid: string, data: AdditionalUserData): Promise<void> {
    await setDoc(doc(this.firestore, `users/${uid}`), data);
  }
}
