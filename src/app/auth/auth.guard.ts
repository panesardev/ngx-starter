import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { take, tap } from "rxjs";
import { AuthService } from "./auth.service";

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated$.pipe(
    take(1),
    tap(exists => !exists && router.navigateByUrl('/login')),
  );
}
