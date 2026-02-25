import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { IBackendError } from '../interface/backend-error.interface';
import { AuthService } from '../services/auth.service';
import { inject, Inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error inesperado';
      if (error.status >= 400) {
        const backendError = error.error as IBackendError;

        console.error('Backend error', {
          status: error.status,
          message: backendError?.message || error.message,
          error: backendError?.error || 'Unknow Error',
        });
      }
      if (error.status == 400) {
        errorMessage = 'Los Datos enviados son invalidos';
      } else if (error.status == 401) {
        auth.logout();
      } else if (error.status == 404) {
        errorMessage = 'No se encontraron datos';
      }
      return throwError(() => new Error(errorMessage));
    }),
  );
};
