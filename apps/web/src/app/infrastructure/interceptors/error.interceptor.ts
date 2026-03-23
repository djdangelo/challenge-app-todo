import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiResponse } from '@core/models/api-response.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const snackBar = inject(MatSnackBar);
    const router = inject(Router);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Ocurrió un error inesperado.';

            if (error.error instanceof ErrorEvent) {
                errorMessage = `Error de red: ${error.error.message}`;
            } else {
                const apiResponse = error.error as ApiResponse<null>;

                if (apiResponse && apiResponse.message) {
                    errorMessage = apiResponse.message;

                    if (apiResponse.errors && apiResponse.errors.length > 0) {
                        errorMessage += `\n${apiResponse.errors.join(', ')}`;
                    }
                }
                switch (error.status) {
                    case 401:
                        errorMessage = 'Tu sesión ha expirado o no tienes acceso. Por favor, inicia sesión de nuevo.';
                        localStorage.removeItem('auth_token');
                        router.navigate(['/login']);
                        break;
                    case 403:
                        errorMessage = 'No tienes permisos para realizar esta acción.';
                        break;
                    case 404:
                        if (req.url.includes('/users/login')) {
                            return throwError(() => error);
                        }
                        break;
                }
            }

            snackBar.open(errorMessage, 'Cerrar', {
                duration: 10000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass: ['error-snackbar']
            });

            return throwError(() => error);
        })
    );
};