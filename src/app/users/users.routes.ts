import { Routes } from '@angular/router';
import { isLoggedGuardFn } from '../shared/services/guard.fn';

export const USERS_ROUTES: Routes = [
  {
    path: 'setting',
    canActivate: [isLoggedGuardFn],
    loadComponent: () =>
      import('./user-setting/user-setting.component').then(
        (m) => m.UserSettingComponent,
      ),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./user-detail/user-detail.component').then(
        (m) => m.UserDetailComponent,
      ),
  },
  {
    path: 'signup',
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
