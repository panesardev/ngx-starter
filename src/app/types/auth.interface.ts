import { GoogleAuthProvider } from "firebase/auth";

export interface Credentials {
  displayName?: string;
  email?: string;
  password?: string;
}

export type OAuthProviderName = 'google';

export const getAuthProvider = (name: OAuthProviderName) => {
  switch (name) {
    case 'google': return new GoogleAuthProvider();
  }
}