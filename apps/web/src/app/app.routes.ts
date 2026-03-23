import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { noAuthGuard } from '@core/guards/no-auth.guard';
import { LayoutComponent } from '@presentation/layout/layout.component';
import { LoginComponent } from '@presentation/pages/login/login.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [noAuthGuard]
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'tasks',
                loadComponent: () => import('@presentation/pages/tasks/tasks.component').then(m => m.TasksComponent)
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'tasks'
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('@presentation/pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
