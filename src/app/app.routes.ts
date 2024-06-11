import { Routes } from '@angular/router';
import IndexComponent from './pages/index/index.component';
import { titleResolver } from './shared/resolvers/title.resolver';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: titleResolver,
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component'),
    title: titleResolver,
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
    title: titleResolver,
  }
];
