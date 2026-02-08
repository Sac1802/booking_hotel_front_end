import { Route } from '@angular/router';
import { Layout } from './layout/layout/layout';

export const routes: Route[] = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/search/search.routes').then(m => m.searchRoutes)
      },
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
      },
      {
        path: 'user',
        loadChildren: () => import('./features/user/user.routes').then(m => m.userRoutes)
      }
    ]
  }
];
