import { Routes } from '@angular/router';
import IndexComponent from './routes/index/index.component';
import { TitleResolver } from './utilities/title.resolver';
import { isAuthenticated } from './utilities/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: TitleResolver,
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./routes/dashboard/dashboard.component'),
    title: TitleResolver,
    canActivate: [isAuthenticated()],
  },
  {
    path: '**',
    loadComponent: () => import('./routes/not-found/not-found.component'),
    title: TitleResolver,
  }
];
