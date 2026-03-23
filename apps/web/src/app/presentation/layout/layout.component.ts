import { Component, inject } from '@angular/core';
import { AuthFacade } from '@application/facades/auth.facade';
import { ThemeService } from '@core/services/theme.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, RouterOutlet],
    standalone: true,
})
export class LayoutComponent {
    private readonly themeService = inject(ThemeService);
    private readonly authFacade = inject(AuthFacade);
    public isDarkTheme = this.themeService.isDarkTheme;

    public toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    public logout(): void {
        this.authFacade.logout();
    }
}