import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, getAdditionalUserInfo, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { Credentials, OAuthProviderName, getAuthProvider } from '../types/auth.interface';
import { User, UserData, newUserData } from '../types/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private router = inject(Router);

  readonly user$ = authState(this.auth).pipe(
    switchMap(user => user ? this.getUser(user) : of(null)),
  );

  readonly isAuthenticated$ = this.user$.pipe(
    map(user => !!user),
    tap(exists => !exists && this.router.navigateByUrl('/login')),
  );

  async signUp({ email, password, displayName }: Credentials): Promise<void> {
    if (!displayName || !email || !password) {
      throw Error('Insufficient information');
    }
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    
    await Promise.all([
      updateProfile(credential.user, { displayName }),
      this.setUser(credential.user, newUserData),
    ]);

    await this.router.navigateByUrl('/dashboard');
  }

  async login({ email, password }: Credentials): Promise<void> {
    if (!email || !password) {
      throw Error('Invalid credentials');
    }
    const credential = await signInWithEmailAndPassword(this.auth, email, password);

    await this.router.navigateByUrl('/dashboard');
  }

  async socialLogin(providerName: OAuthProviderName): Promise<void> {
    const provider = getAuthProvider(providerName);
    const credential = await signInWithPopup(this.auth, provider);

    if (getAdditionalUserInfo(credential).isNewUser) {
      await this.setUser(credential.user, newUserData);
    }

    await this.router.navigateByUrl('/dashboard');
  }

  async resetPassword({ email }: Credentials): Promise<void> {
    if (!email) 
      throw Error('Email required');
    
    await sendPasswordResetEmail(this.auth, email);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigateByUrl('/');
  }
  
  async setUser(user: User, data: UserData): Promise<void> {
    await setDoc(doc(this.firestore, `users/${user.uid}`), data);
  }

  getUser(user: User): Observable<User> {
    return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
      map((data: UserData) => ({ ...user, ...data }))
    );
  }

}

