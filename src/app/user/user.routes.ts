import { Route } from '@angular/router';
import { Dashboard } from './dashboard';
import { AuthGuard } from '../guards/auth-guard';

export const userRoutes: Route[] = [
  {
    path: '',
    component: Dashboard,
    canActivate: [AuthGuard],
  },
];
