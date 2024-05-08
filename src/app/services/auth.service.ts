import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User as AuthUser, createUserWithEmailAndPassword, getAdditionalUserInfo, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { authState } from 'rxfire/auth';
import { docData } from 'rxfire/firestore';
import { Observable, map, of, switchMap } from 'rxjs';
import { AUTH, FIRESTORE } from '../app.config';
import { AuthData, OAuthProviderName, getAuthProvider } from '../types/auth.interface';
import { User, UserData, createUserData } from '../types/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(AUTH);
  private firestore = inject(FIRESTORE);
  private router = inject(Router);

  readonly user$ = authState(this.auth).pipe(
    switchMap((user: AuthUser) => {
      if (user) {
        return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
          map((data: UserData) => ({ ...user, ...data })),
        ) as Observable<User>;
      }
      else return of(null);
    }),
  );

  readonly isAuthenticated$ = this.user$.pipe(
    map(user => !!user),
  );

  async createAccount({ email, password, displayName }: AuthData): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await Promise.all([
      updateProfile(credential.user, { displayName }), 
      this.setUserData(credential.user.uid, createUserData()),
      this.router.navigateByUrl('/dashboard'),
    ]);
  }

  async login({ email, password }: AuthData): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
    await this.router.navigateByUrl('/dashboard');
  }

  async oAuthLogin(providerName: OAuthProviderName): Promise<void> {
    const provider = getAuthProvider(providerName);
    const credential = await signInWithPopup(this.auth, provider);

    if (getAdditionalUserInfo(credential).isNewUser)
      await this.setUserData(credential.user.uid, createUserData());

    await this.router.navigateByUrl('/dashboard');
  }

  async resetPassword({ email }: AuthData): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigateByUrl('/');
  }
  
  async setUserData(uid: string, data: UserData): Promise<void> {
    await setDoc(doc(this.firestore, `users/${uid}`), data);
  }
}
