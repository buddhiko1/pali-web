import { NgModule, inject } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';

import { RoleService } from 'src/app/core/role.service';
import { UrlEnum as AppUrlEnum } from 'src/app/app-routing.module';
import { LoginComponent } from './login/login.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountInitComponent } from './account-init/account-init.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ResetRequestComponent } from './reset-request/reset-request.component';
import { MeComponent } from './me/me.component';

export enum UrlEnum {
  Me = 'me',
  Login = 'login',
  AccountCreate = 'create',
  AccountInit = 'init',
  ResetRequest = 'request',
  PasswordReset = 'reset',
}

// https://itnext.io/everything-you-need-to-know-about-route-guard-in-angular-697a062d3198
const canActiveLogin = (
  roleService = inject(RoleService),
  router = inject(Router)
) => {
  return roleService.isPublic
    ? true
    : router.parseUrl(`${AppUrlEnum.Account}/${UrlEnum.Me}`);
};

const canActiveMe = (
  roleService = inject(RoleService),
  router = inject(Router)
) => {
  return roleService.isUser
    ? true
    : router.parseUrl(`${AppUrlEnum.Account}/${UrlEnum.Login}`);
};

const routes: Routes = [
  { path: '', redirectTo: `${UrlEnum.Me}`, pathMatch: 'full' },
  {
    path: UrlEnum.Me,
    canActivate: [() => canActiveMe()],
    component: MeComponent,
  },
  {
    path: UrlEnum.Login,
    canActivate: [() => canActiveLogin()],
    component: LoginComponent,
  },
  {
    path: UrlEnum.AccountCreate,
    component: AccountCreateComponent,
  },
  {
    path: UrlEnum.AccountInit,
    component: AccountInitComponent,
  },
  {
    path: UrlEnum.ResetRequest,
    component: ResetRequestComponent,
  },
  {
    path: UrlEnum.PasswordReset,
    component: PasswordResetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
