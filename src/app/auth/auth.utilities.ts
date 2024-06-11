import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { AuthUserData, OAuthProviderName } from "./auth.interface";

export function createAuthUserData(): AuthUserData {
  return {
    created: new Date().toDateString().slice(3),
    slugs: [],
  };
}

export function getAuthProvider(name: OAuthProviderName) {
  switch (name) {
    case 'google': return new GoogleAuthProvider();
    case 'github': return new GithubAuthProvider();
    default: throw Error('Auth provider not supported');
  }
}
