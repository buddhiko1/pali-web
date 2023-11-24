import { inject } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { RoleService } from 'src/app/core/role.service';

export enum UrlEnum {
  Me = '',
  Login = 'login',
  AccountCreate = 'create',
  AccountInit = 'init',
  ResetRequest = 'request',
  PasswordReset = 'reset',
}

// https://itnext.io/everything-you-need-to-know-about-route-guard-in-angular-697a062d3198
const canActiveLogin = (
  roleService = inject(RoleService),
  router = inject(Router),
) => {
  return roleService.isPublic ? true : router.parseUrl(`account/${UrlEnum.Me}`);
};

const canActiveMe = (
  roleService = inject(RoleService),
  router = inject(Router),
) => {
  return roleService.isUser
    ? true
    : router.parseUrl(`account/${UrlEnum.Login}`);
};

export const ACCOUNT_ROUTES: Routes = [
  {
    path: UrlEnum.Me,
    canActivate: [() => canActiveMe()],
    loadComponent: () => import('./me/me.component').then((m) => m.MeComponent),
  },
  {
    path: UrlEnum.Login,
    canActivate: [() => canActiveLogin()],
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: UrlEnum.AccountCreate,
    loadComponent: () =>
      import('./account-create/account-create.component').then(
        (m) => m.AccountCreateComponent,
      ),
  },
  {
    path: UrlEnum.AccountInit,
    loadComponent: () =>
      import('./account-init/account-init.component').then(
        (m) => m.AccountInitComponent,
      ),
  },
  {
    path: UrlEnum.ResetRequest,
    loadComponent: () =>
      import('./reset-request/reset-request.component').then(
        (m) => m.ResetRequestComponent,
      ),
  },
  {
    path: UrlEnum.PasswordReset,
    loadComponent: () =>
      import('./password-reset/password-reset.component').then(
        (m) => m.PasswordResetComponent,
      ),
  },
];
