import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthFacade } from '@application/facades/auth.facade';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogComponent } from '@presentation/shared/components/confirm-dialog/confirm-dialog.component';
import { A11yModule } from '@angular/cdk/a11y';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, switchMap, EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, ReactiveFormsModule, A11yModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authFacade = inject(AuthFacade);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public emailControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email]
  });

  public isLoading = this.authFacade.isLoading;

  public onSubmit(): void {
    if (this.emailControl.invalid) return;

    const email = this.emailControl.value;
    this.authFacade.login(email)
      .pipe(
        catchError((err) => {
          if (err.status === 404) {
            return this.promptRegistration(email);
          }
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private promptRegistration(email: string): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Usuario no encontrado',
        message: `El correo ${email} no está registrado. ¿Deseas crear una cuenta nueva con este correo?`,
        confirmText: 'Sí, registrarme',
        cancelText: 'Cancelar'
      }
    });

    return dialogRef.afterClosed().pipe(
      filter(Boolean),
      switchMap(() => this.authFacade.register(email))
    );
  }
}
