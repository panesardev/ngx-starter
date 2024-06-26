import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { AdditionalUserData, OAuthProviderName } from "./auth.interface";

export function createUserData(): AdditionalUserData {
  return {
    created: new Date().toDateString(),
  };
}

export function getAuthProvider(name: OAuthProviderName) {
  switch (name) {
    case 'google': return new GoogleAuthProvider();
    case 'github': return new GithubAuthProvider();
    default: throw Error('Auth provider not supported');
  }
}
