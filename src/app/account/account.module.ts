import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SlideInDirective } from '../core/slide-in.directive';
import { FadeInDirective } from '../core/fade-in.directive';
import { LoaderComponent } from '../loader/loader.component';
import { UploaderComponent } from '../uploader/uploader.component';
import { OverlayComponent } from '../overlay/overlay.component';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountInitComponent } from './account-init/account-init.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ResetRequestComponent } from './reset-request/reset-request.component';
import { MeComponent } from './me/me.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    SlideInDirective,
    FadeInDirective,
    LoaderComponent,
    OverlayComponent,
    UploaderComponent,
    LoginComponent,
    AccountCreateComponent,
    AccountInitComponent,
    PasswordResetComponent,
    ResetRequestComponent,
    MeComponent,
  ],
})
export class AccountModule {}
