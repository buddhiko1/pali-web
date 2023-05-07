import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MarkLoaderComponent } from 'src/app/mark-loader/mark-loader.component';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InitComponent } from './init/init.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, InitComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    MarkLoaderComponent,
  ],
})
export class AccountModule {}
