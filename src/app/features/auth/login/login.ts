import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LoginFormComponent } from '../login-form-component/login-form-component';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatIconModule, LoginFormComponent],
  template: `
    <app-login-form
      [loading]="isLoading()"
      [error]="loginError()"
      (formSubmit)="onLoginFormSubmit($event)"
    ></app-login-form>
  `,
  styleUrl: './login.scss',
})
export class Login {
  isLoading = signal(false);
  loginError = signal<number | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    effect(() => {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/']);
      }
    });
  }

  onLoginFormSubmit(credentials: { email: string; password: string }) {
    this.isLoading.set(true);
    this.loginError.set(null);
    this.authService.login(credentials).subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.loginError.set(err.status);
      },
    });
  }
}
