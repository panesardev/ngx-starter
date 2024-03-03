import { User as FirebaseUser } from '@firebase/auth';

export interface User extends FirebaseUser, UserData {}

export interface UserData {
  address?: string
}
export const newUserData: UserData = {
  address: '',
}