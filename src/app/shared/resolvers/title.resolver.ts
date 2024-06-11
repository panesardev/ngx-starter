import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { BRAND } from "../../app.constants";

export const titleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const path = route.routeConfig.path;
  let title = 'Home';

  if (path) {
    title = path.charAt(0).toUpperCase() + path.slice(1);
  }
  
  if (path === '**') {
    title = `Page Not Found`;
  }
  
  return `${title} - ${BRAND}`;
};