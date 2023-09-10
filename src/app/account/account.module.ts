import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SlideOnLoadingDirective } from 'src/app/core/slide-on-loading.directive';
import { PromptComponent } from 'src/app/prompt/prompt.component';

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
    ReactiveFormsModule,
    AccountRoutingModule,
    SlideOnLoadingDirective,
    PromptComponent,
  ],
})
export class AccountModule {}
