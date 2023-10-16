import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { SliderDirective } from 'src/app/core/slider.directive';
import { FadeInDirective } from '../core/fade-in.directive';
import { LoaderComponent } from 'src/app/loader/loader.component';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountInitComponent } from './account-init/account-init.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ResetRequestComponent } from './reset-request/reset-request.component';
import { MeComponent } from './me/me.component';

@NgModule({
  declarations: [
    LoginComponent,
    AccountCreateComponent,
    AccountInitComponent,
    PasswordResetComponent,
    ResetRequestComponent,
    MeComponent,
  ],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    SliderDirective,
    FadeInDirective,
    LoaderComponent,
  ],
})
export class AccountModule {}
