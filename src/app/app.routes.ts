import { Routes } from '@angular/router';
import IndexComponent from './routes/index/index.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'about',
    loadComponent: () => import('./routes/about/about.component'),
  },
  {
    path: '**',
    loadComponent: () => import('./routes/not-found/not-found.component'),
    pathMatch: 'full',
  }
];
