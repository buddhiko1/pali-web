import { Routes } from '@angular/router';
import { isPublicGuardFn } from '../shared/services/guard.fn';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [isPublicGuardFn],
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'reset-request',
    loadComponent: () =>
      import('./reset-request/reset-request.component').then(
        (m) => m.ResetRequestComponent,
      ),
  },
  {
    path: 'password-reset',
    loadComponent: () =>
      import('./password-reset/password-reset.component').then(
        (m) => m.PasswordResetComponent,
      ),
  },
];
