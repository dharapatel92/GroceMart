import { Routes } from '@angular/router';
import { APP_ROUTES } from './core/constants/app-routes.const';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  {
    path: `auth/login`,
    loadComponent: () =>
      import('./auth/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: `admin/login`,
    loadComponent: () =>
      import('./auth/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: `vendor/login`,
    loadComponent: () =>
      import('./auth/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: `auth/forgot-password`,
    loadComponent: () =>
      import('./auth/components/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: `auth/reset-password`,
    loadComponent: () =>
      import('./auth/components/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
  { path: '**', redirectTo: '/not-found' },
];
