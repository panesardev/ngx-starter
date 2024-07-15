import type { User } from 'firebase/auth';

export interface AuthUser extends User, AdditionalUserData {}

export interface AdditionalUserData {
  created: string;
}

export type OAuthProviderName = 'google' | 'github';

export interface Credentials {
  email?: string;
  password?: string;
  displayName?: string;
}