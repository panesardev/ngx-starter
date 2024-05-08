import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { take, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated$.pipe(
    take(1),
    tap(exists => !exists && router.navigateByUrl('/login')),
  );
}
