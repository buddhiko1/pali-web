import { inject } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { RoleService } from '../shared/services/role.service';
import { UrlService } from '../shared/services/url.service';

// https://itnext.io/everything-you-need-to-know-about-route-guard-in-angular-697a062d3198
const canActiveLogin = (
  roleService = inject(RoleService),
  router = inject(Router),
  urlService = inject(UrlService),
) => {
  return roleService.isPublic ? true : router.parseUrl(urlService.urlForMe);
};

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [() => canActiveLogin()],
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
