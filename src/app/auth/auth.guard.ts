import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, tap } from "rxjs";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.user$.pipe(
    map(user => !!user),
    tap(exists => !exists && router.navigate(['/login'])),
  );
}
