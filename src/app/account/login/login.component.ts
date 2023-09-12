import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginMutationVariables } from 'src/gql/graphql';
import { StatusEnum as LoaderStatusEnum } from 'src/app/loader/loader.component';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  UrlEnum = UrlEnum;

  isSubmitted = false;
  loaderStatus = LoaderStatusEnum.Idle;
  loaderPrompt = '';

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'submit',
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'submit',
      }),
    });
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitted = true;
    this.loaderStatus = LoaderStatusEnum.Loading;

    const args: LoginMutationVariables = {
      email: this.form.getRawValue().email,
      password: this.form.getRawValue().password,
    };
    this._accountService
      .login(args)
      .then(() => {
        this._router.navigate([`../${UrlEnum.Me}`], {
          relativeTo: this._activeRoute,
        });
      })
      .catch((error) => {
        this.loaderStatus = LoaderStatusEnum.Failed;
        this.loaderPrompt = error.toString();
      });
  }

  reEdit(): void {
    this.loaderStatus = LoaderStatusEnum.Idle;
    this.isSubmitted = false;
  }

  requestReset(): void {
    this._router.navigate([`../${UrlEnum.ResetRequest}`], {
      relativeTo: this._activeRoute,
    });
  }

  createAccount(): void {
    this._router.navigate([`../${UrlEnum.AccountCreate}`], {
      relativeTo: this._activeRoute,
    });
  }
}
