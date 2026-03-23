import { Injectable, signal, effect } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_KEY = 'app_theme';

    public readonly isDarkTheme = signal<boolean>(false);

    constructor() {
        const savedTheme = localStorage.getItem(this.THEME_KEY);

        if (savedTheme) {
            this.isDarkTheme.set(savedTheme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.isDarkTheme.set(prefersDark);
        }
        effect(() => {
            const isDark = this.isDarkTheme();

            localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');

            if (isDark) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    }

    public toggleTheme(): void {
        this.isDarkTheme.update(current => !current);
    }
}