import { Routes } from '@angular/router';
import { isLoggedGuardFn } from '../shared/services/guard.fn';

export const USERS_ROUTES: Routes = [
  {
    path: 'me',
    canActivate: [isLoggedGuardFn],
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
