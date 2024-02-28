import { Routes } from '@angular/router';
import IndexComponent from './routes/index/index.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: '**',
    loadComponent: () => import('./routes/not-found/not-found.component'),
    pathMatch: 'full',
  }
];
