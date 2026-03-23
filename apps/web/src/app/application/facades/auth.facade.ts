import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@infrastructure/services/auth.service";
import { ApiResponse, AuthResponse, User } from "@core/models/models";
import { Observable, finalize, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {
    private readonly authApi = inject(AuthService);
    private readonly router = inject(Router);

    private readonly _currentUser = signal<User | null>(null);
    private readonly _isLoading = signal<boolean>(false);
    public readonly currentUser = this._currentUser.asReadonly();
    public readonly isLoading = this._isLoading.asReadonly();

    public login(email: string): Observable<ApiResponse<AuthResponse>> {
        this._isLoading.set(true);

        return this.authApi.login(email).pipe(
            tap((response: ApiResponse<AuthResponse>) => {
                if (response.data) {
                    this.setSession(response.data.user, response.data.token);
                    this.router.navigate(['/']);
                }
            }),
            finalize(() => this._isLoading.set(false))
        );
    }

    public register(email: string): Observable<ApiResponse<AuthResponse>> {
        this._isLoading.set(true);

        return this.authApi.register(email).pipe(
            tap((response: ApiResponse<AuthResponse>) => {
                if (response.data) {
                    this.setSession(response.data.user, response.data.token);
                    this.router.navigate(['/']);
                }
            }),
            finalize(() => this._isLoading.set(false))
        );
    }

    public logout(): void {
        localStorage.removeItem('auth_token');
        this._currentUser.set(null);
        this.router.navigate(['/login']);
    }

    private setSession(user: User, token: string): void {
        localStorage.setItem('auth_token', token);
        this._currentUser.set(user);
    }
}