import { User as AuthUser } from '@angular/fire/auth';

export interface User extends AuthUser, UserData {}

export interface UserData {
  joined: string;
}

export function createUserData(): UserData {
  return {
    joined: new Date().toDateString(),
  }
}
