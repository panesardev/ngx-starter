import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User as AuthUser, createUserWithEmailAndPassword, getAdditionalUserInfo, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { authState } from 'rxfire/auth';
import { docData } from 'rxfire/firestore';
import { Observable, map, of, switchMap } from 'rxjs';
import { AuthUserData, OAuthProviderName } from './auth.interface';
import { createAuthUserData, getAuthProvider } from './auth.utilities';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = getAuth();
  private firestore = getFirestore();
  private router = inject(Router);

  readonly user$: Observable<AuthUser> = authState(this.auth).pipe(
    switchMap((user: AuthUser) => {
      if (user) {
        return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
          map((data: AuthUserData) => ({ ...user, ...data })),
        ) as Observable<AuthUser>;
      }
      else return of(null);
    }),
  );

  readonly isAuthenticated$ = this.user$.pipe(
    map(user => !!user),
  );

  async createAccount(email: string, password: string, displayName: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await Promise.all([
      updateProfile(credential.user, { displayName }), 
      this.setUserData(credential.user.uid, createAuthUserData()),
      this.router.navigateByUrl('/dashboard'),
    ]);
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
    await this.router.navigateByUrl('/dashboard');
  }

  async oAuthLogin(providerName: OAuthProviderName): Promise<void> {
    const provider = getAuthProvider(providerName);
    const credential = await signInWithPopup(this.auth, provider);

    if (getAdditionalUserInfo(credential).isNewUser)
      await this.setUserData(credential.user.uid, createAuthUserData());

    await this.router.navigateByUrl('/dashboard');
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigateByUrl('/');
  }
  
  async setUserData(uid: string, data: AuthUserData): Promise<void> {
    await setDoc(doc(this.firestore, `users/${uid}`), data);
  }
}
