import { User as AuthUser } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

export interface User extends AuthUser, UserData {}

export interface UserData {
  address: string;
}

export const newUserData: UserData = {
  address: '',
}

export function mapUser(firestore: Firestore, user: AuthUser): Observable<User> {
  return docData(doc(firestore, `users/${user.uid}`)).pipe(
    map((data: UserData) => ({ ...user, ...data })),
  );
}
