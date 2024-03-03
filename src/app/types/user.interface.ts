import { User as FirebaseUser } from '@firebase/auth';

export interface User extends FirebaseUser, UserData {}

export interface UserData {
  saved?: string[];
  isPro?: boolean;
}
export const newUserData: UserData = {
  isPro: false,
  saved: [],
}