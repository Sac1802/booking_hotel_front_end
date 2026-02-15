import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../interface/login-response';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = signal(false);
  readonly TOKEN = 'access_token';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.TOKEN);
    if (token) {
      this.isLoggedIn.set(true);
      
    }
  }

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<{ access_token: string }>('http://localhost:3000/auth/login', credentials)
      .pipe(
        tap((res) => {
          localStorage.setItem(this.TOKEN, res.access_token);
          this.isLoggedIn.set(true);
        }),
        catchError((error) => {
          console.error('Error Login:', error);
          return throwError(() => error);
        }),
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN);
    this.isLoggedIn.set(false);
  }
}
