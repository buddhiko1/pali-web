/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { MutationAuth_LoginArgs } from '../../gql/graphql';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  UrlEnum: typeof UrlEnum = UrlEnum;
  loginForm!: FormGroup;

  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'blur',
      }),
    });
  }

  async login(): Promise<void> {
    const loginArgs: MutationAuth_LoginArgs = {
      email: this.loginForm.getRawValue().email,
      password: this.loginForm.getRawValue().password,
    };
    await this._accountService.login(loginArgs);
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}
