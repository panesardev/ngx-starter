import { User as AuthUser } from '@angular/fire/auth';

export interface User extends AuthUser, UserData {}

export interface UserData {
  address?: string
}

export const newUserData: UserData = {
  address: '',
}