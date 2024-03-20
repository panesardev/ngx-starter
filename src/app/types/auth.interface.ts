import { GoogleAuthProvider } from "firebase/auth";

export interface AuthData {
  displayName?: string;
  email?: string;
  password?: string;
}

export type OAuthProviderName = 'google';

export function getAuthProvider(name: OAuthProviderName) {
  switch (name) {
    case 'google': return new GoogleAuthProvider();
  }
}
