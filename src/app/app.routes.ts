import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./search/search.routes').then((m) => m.searchRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.routes').then((m) => m.userRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
