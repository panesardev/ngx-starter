import { User as AuthUser } from '@angular/fire/auth';

export interface User extends AuthUser, UserData {}

export interface UserData {
  created: string;
}

export function createUserData(): UserData {
  return {
    created: new Date().toDateString(),
  }
}
