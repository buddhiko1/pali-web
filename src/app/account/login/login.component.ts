import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginMutationVariables } from 'src/gql/graphql';
import { StatusEnum as LoaderStatusEnum } from 'src/app/loader/loader.component';
import { OverlayService } from 'src/app/overlay/overlay.service';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { UnRegisteredEmailValidator } from '../email.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  UrlEnum = UrlEnum;

  isSubmitted = false;
  loaderStatus = LoaderStatusEnum.Idle;
  loaderPrompt = '';

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _accountService: AccountService,
    private _unRegisteredEmailValidator: UnRegisteredEmailValidator,
    private _overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this._unRegisteredEmailValidator.validate.bind(
            this._unRegisteredEmailValidator
          ),
        ],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'change',
      }),
    });
    this._overlayService.active(true);
  }

  ngOnDestroy(): void {
    this._overlayService.active(false);
  }

  get email() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('email')!;
  }

  get password() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('password')!;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const args: LoginMutationVariables = {
      email: this.form.getRawValue().email,
      password: this.form.getRawValue().password,
    };

    this.isSubmitted = true;
    this.loaderStatus = LoaderStatusEnum.Loading;

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

  onRequestReset(): void {
    this._router.navigate([`../${UrlEnum.ResetRequest}`], {
      relativeTo: this._activeRoute,
    });
  }

  onCreateAccount(): void {
    this._router.navigate([`../${UrlEnum.AccountCreate}`], {
      relativeTo: this._activeRoute,
    });
  }
}
