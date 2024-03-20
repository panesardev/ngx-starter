import { Injectable, inject } from '@angular/core';
import { Auth, User as AuthUser, authState, createUserWithEmailAndPassword, getAdditionalUserInfo, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { AuthData, OAuthProviderName, getAuthProvider } from '../types/auth.interface';
import { User, UserData, newUserData } from '../types/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  readonly user$ = authState(this.auth).pipe(
    switchMap((user: AuthUser) => {
      if (user) {
        return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
          map((data: UserData) => ({ ...user, ...data })),
        ) as Observable<User>;
      }
      return of(null);
    }),
  );

  async createAccount({ email, password, displayName }: AuthData): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await Promise.all([
      updateProfile(credential.user, { displayName }), 
      this.setUser(credential.user.uid, newUserData),
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
      await this.setUser(credential.user.uid, newUserData);

    await this.router.navigateByUrl('/dashboard');
  }

  async resetPassword({ email }: AuthData): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigateByUrl('/');
  }
  
  async setUser(uid: string, data: UserData): Promise<void> {
    await setDoc(doc(this.firestore, `users/${uid}`), data);
  }
}
