import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

import { RoleService } from './role.service';
import { StorageService } from './storage.service';

// https://itnext.io/everything-you-need-to-know-about-route-guard-in-angular-697a062d3198
export const isLoggedGuardFn: CanActivateFn = () => {
  return inject(RoleService).isPublic
    ? inject(Router).parseUrl('auth/login')
    : true;
};

export const isPublicGuardFn: CanActivateFn = () => {
  const userId = inject(StorageService).account?.id;
  return inject(RoleService).isPublic
    ? true
    : inject(Router).parseUrl(`users/detail/${userId}`);
};
