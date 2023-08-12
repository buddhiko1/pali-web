import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MarkLoaderComponent } from 'src/app/mark-loader/mark-loader.component';
import { SlideOnLoadingDirective } from 'src/app/core/slide-on-loading.directive';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountInitComponent } from './account-init/account-init.component';

@NgModule({
  declarations: [LoginComponent, AccountCreateComponent, AccountInitComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    MarkLoaderComponent,
    SlideOnLoadingDirective,
  ],
})
export class AccountModule {}
