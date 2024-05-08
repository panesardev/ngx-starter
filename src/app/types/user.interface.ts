import { User as AuthUser } from 'firebase/auth';

export interface User extends AuthUser, UserData {}

export interface UserData {
  createdAt: string;
}

export function createUserData(): UserData {
  return {
    createdAt: new Date().toString(),
  }
}
