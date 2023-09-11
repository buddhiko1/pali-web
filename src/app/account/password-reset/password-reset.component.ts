import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  ResetPasswordMutationVariables,
  LoginMutationVariables,
} from 'src/gql/graphql';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit {
  UrlEnum = UrlEnum;
  form!: FormGroup;
  error = '';
  private _token = '';
  private _email = '';

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _accountService: AccountService
  ) {
    this._activeRoute.queryParams.subscribe((params) => {
      this._token = params['token'];
      this._email = JSON.parse(
        window.atob(params['token'].split('.')[1])
      ).email;
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl({ value: this._email, disabled: true }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'blur',
      }),
    });
  }

  get password() {
    return this.form.get('password')!;
  }

  submit(): void {
    const password = this.form.getRawValue().password;
    const args: ResetPasswordMutationVariables = {
      token: this._token,
      password: password,
    };
    this._accountService.resetPassword(args).then(() => {
      const args: LoginMutationVariables = {
        email: this._email,
        password: password,
      };
      this._accountService.login(args).then(() => {
        this._router.navigate([`../${UrlEnum.Me}`], {
          relativeTo: this._activeRoute,
        });
      });
    });
  }
}
