import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export enum UrlEnum {
  SignIn = 'signIn',
  SignUp = 'signUp',
  Reset = 'reset',
  Invite = 'invite',
}

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { animation: UrlEnum.SignIn },
  },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
