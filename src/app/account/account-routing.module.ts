import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InitComponent } from './init/init.component';

export enum UrlEnum {
  SignIn = '',
  SignUp = 'signUp',
  Reset = 'reset',
  Init = 'init',
}

const routes: Routes = [
  {
    path: UrlEnum.SignIn,
    component: LoginComponent,
    data: { animation: UrlEnum.SignIn },
  },
  {
    path: UrlEnum.SignUp,
    component: SignUpComponent,
    data: { animation: UrlEnum.SignUp },
  },
  {
    path: UrlEnum.Init,
    component: InitComponent,
    data: { animation: UrlEnum.Init },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
