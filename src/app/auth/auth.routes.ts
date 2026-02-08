import { Route } from '@angular/router';
import { Login } from './login/login';

export const authRoutes: Route[] = [
  {
    path: '',
    component: Login,
  },
];
