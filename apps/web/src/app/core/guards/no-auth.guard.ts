import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state): boolean | UrlTree => {
    const router = inject(Router);
    const token = localStorage.getItem('auth_token');

    if (token) {
        return router.createUrlTree(['/']);
    }

    return true;
};