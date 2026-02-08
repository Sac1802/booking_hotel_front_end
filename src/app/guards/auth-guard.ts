import {
  CanActivate,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = false;
    if (!isLoggedIn) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
