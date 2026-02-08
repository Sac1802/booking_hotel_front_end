import { Route } from '@angular/router';
import { Layout } from './layout/layout/layout';

export const routes: Route[] = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadChildren: () => import('./search/search.routes').then(m => m.searchRoutes)
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.routes').then(m => m.userRoutes)
      }
    ]
  }
];
