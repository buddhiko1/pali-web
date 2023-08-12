import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountInitComponent } from './account-init/account-init.component';

export enum UrlEnum {
  Login = '',
  AccountCreate = 'create',
  AccountInit = 'init',
  PwdRequest = 'pwdRequest',
  RwdReset = 'reset',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
