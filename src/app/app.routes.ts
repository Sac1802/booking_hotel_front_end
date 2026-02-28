import { Route } from '@angular/router';
import { Layout } from './shared/components/layout/layout';

export const routes: Route[] = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.routes').then(m => m.homeRoutes)
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
