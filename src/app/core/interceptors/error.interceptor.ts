import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { IBackendError } from "../interface/backend-error.interface";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if(error.status >= 400){
                const backendError = error.error as IBackendError;

                console.error('Backend error', {
                    status: error.status,
                    message: backendError?.message || error.message,
                    error: backendError?.error || 'Unknow Error'
                });
            }
            return throwError(() => error);
        })
    );
};