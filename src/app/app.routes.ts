import { Routes } from '@angular/router';
import IndexComponent from './routes/index/index.component';
import { titleResolver } from './utilities/title.resolver';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: titleResolver,
  },
  {
    path: '**',
    loadComponent: () => import('./routes/not-found/not-found.component'),
    title: titleResolver,
  }
];
