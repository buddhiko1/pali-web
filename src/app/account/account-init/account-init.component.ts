import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  InitAccountMutationVariables,
  LoginMutationVariables,
} from 'src/gql/graphql';
import { StatusEnum as LoaderStatusEnum } from 'src/app/loader/loader.component';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-init',
  templateUrl: './account-init.component.html',
  styleUrls: ['./account-init.component.css'],
})
export class AccountInitComponent implements OnInit {
  UrlEnum = UrlEnum;
  form!: FormGroup;

  private _token = '';
  private _email = '';

  isSubmitted = false;
  loaderStatus = LoaderStatusEnum.Idle;
  loaderPrompt = '';

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
        updateOn: 'change',
      }),
    });
  }

  get password() {
    return this.form.get('password')!;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const password = this.form.getRawValue().password;
    const args: InitAccountMutationVariables = {
      token: this._token,
      password: password,
    };

    this.isSubmitted = true;
    this.loaderStatus = LoaderStatusEnum.Loading;

    this._accountService
      .initAccount(args)
      .then(() => {
        const args: LoginMutationVariables = {
          email: this._email,
          password: password,
        };
        this._accountService.login(args).then(() => {
          this._router.navigate([`../${UrlEnum.Me}`], {
            relativeTo: this._activeRoute,
          });
        });
      })
      .catch((error) => {
        this.loaderStatus = LoaderStatusEnum.Failed;
        this.loaderPrompt = error.toString();
      });
  }
}
