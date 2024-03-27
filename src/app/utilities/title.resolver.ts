import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { BRAND } from "../app.constants";

export const TitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const path = route.routeConfig?.path;

  let title: string = `Home`;

  if (path) {
    title = path[0].toUpperCase() + path.slice(1, path.length);
  }

  if (path === '**') {
    title = `Page Not Found`;
  }

  return `${title} - ${BRAND}`;
}