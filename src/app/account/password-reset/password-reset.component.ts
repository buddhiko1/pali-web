import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ResetPasswordMutationVariables } from 'src/gql/graphql';
import { NavigationService } from 'src/app/core/navigation.service';
import { PromptEnum } from 'src/app/core/prompts.interaction';
import { OverlayService } from 'src/app/overlay/overlay.service';
import { StatusEnum as LoaderStatusEnum } from 'src/app/loader/loader.component';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  UrlEnum = UrlEnum;
  form!: FormGroup;

  isSubmitted = false;
  loaderStatus = LoaderStatusEnum.Idle;
  loaderPrompt = '';

  private _token = '';
  private _email = '';

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _accountService: AccountService,
    private _navigationService: NavigationService,
    private _overlayService: OverlayService,
  ) {
    this._activeRoute.queryParams.subscribe((params) => {
      this._token = params['token'];
      this._email = JSON.parse(
        window.atob(params['token'].split('.')[1]),
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
    this._overlayService.active();
  }

  ngOnDestroy(): void {
    this._overlayService.deactive();
  }

  get password() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('password')!;
  }

  get isSuccessful(): boolean {
    return this.loaderStatus === LoaderStatusEnum.Successful;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const args: ResetPasswordMutationVariables = {
      token: this._token,
      password: this.form.getRawValue().password,
    };

    this.isSubmitted = true;
    this.loaderStatus = LoaderStatusEnum.Loading;

    this._accountService
      .resetPassword(args)
      .then(() => {
        this.loaderStatus = LoaderStatusEnum.Successful;
        this.loaderPrompt = PromptEnum.Reset;
      })
      .catch((error) => {
        this.loaderStatus = LoaderStatusEnum.Failed;
        this.loaderPrompt = error.toString();
      });
  }

  login(): void {
    this._accountService.logout();
    this._router.navigate([`../${UrlEnum.Login}`], {
      relativeTo: this._activeRoute,
    });
  }

  goback(): void {
    this._navigationService.back();
  }
}
