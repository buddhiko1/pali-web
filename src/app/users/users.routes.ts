import { inject } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { RoleService } from '../shared/services/role.service';
import { UrlService } from '../shared/services/url.service';

const canActiveMe = (
  roleService = inject(RoleService),
  router = inject(Router),
  urlService = inject(UrlService),
) => {
  return roleService.isUser ? true : router.parseUrl(urlService.urlForLogin);
};

export const USERS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [() => canActiveMe()],
    loadComponent: () => import('./me/me.component').then((m) => m.MeComponent),
  },
  {
    path: 'creation',
    loadComponent: () =>
      import('./user-creation/user-creation.component').then(
        (m) => m.UserCreationComponent,
      ),
  },
  {
    path: 'activation',
    loadComponent: () =>
      import('./user-activation/user-activation.component').then(
        (m) => m.UserActivationComponent,
      ),
  },
];
