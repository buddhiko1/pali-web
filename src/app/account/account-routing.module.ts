import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountInitComponent } from './account-init/account-init.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ResetRequestComponent } from './reset-request/reset-request.component';
import { ProfileComponent } from './profile/profile.component';

export enum UrlEnum {
  Login = '',
  AccountCreate = 'create',
  AccountInit = 'init',
  ResetRequest = 'request',
  PasswordReset = 'reset',
  Profile = 'profile',
}

const routes: Routes = [
  {
    path: UrlEnum.Login,
    component: LoginComponent,
    data: { animation: UrlEnum.Login },
  },
  {
    path: UrlEnum.AccountCreate,
    component: AccountCreateComponent,
    data: { animation: UrlEnum.AccountCreate },
  },
  {
    path: UrlEnum.AccountInit,
    component: AccountInitComponent,
    data: { animation: UrlEnum.AccountInit },
  },
  {
    path: UrlEnum.ResetRequest,
    component: ResetRequestComponent,
    data: { animation: UrlEnum.ResetRequest },
  },
  {
    path: UrlEnum.PasswordReset,
    component: PasswordResetComponent,
    data: { animation: UrlEnum.PasswordReset },
  },
  {
    path: UrlEnum.Profile,
    component: ProfileComponent,
    data: { animation: UrlEnum.Profile },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
