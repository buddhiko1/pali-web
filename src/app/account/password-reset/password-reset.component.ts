import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { NavigationService } from 'src/app/core/navigation.service';
import { PromptEnum } from 'src/app/core/prompts.interaction';
import {
  StatusEnum as LoaderStatusEnum,
  LoaderComponent,
} from 'src/app/loader/loader.component';
import { SliderDirective } from 'src/app/core/slider.directive';
import { OverlayComponent } from 'src/app/overlay/overlay.component';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { ResetPasswordMutationVariables } from 'src/gql/graphql';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    OverlayComponent,
    SliderDirective,
    LoaderComponent,
  ],
})
export class PasswordResetComponent implements OnInit {
  UrlEnum = UrlEnum;
  form!: FormGroup;

  loaderStatus = LoaderStatusEnum.Idle;
  loaderPrompt = '';

  private _token = '';
  private _email = '';

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _accountService: AccountService,
    private _navigationService: NavigationService,
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
  }

  get isLoaderActived(): boolean {
    return this.loaderStatus !== LoaderStatusEnum.Idle;
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

  routeToLogin(): void {
    this._accountService.logout();
    this._router.navigate([`../${UrlEnum.Login}`], {
      relativeTo: this._activeRoute,
    });
  }

  goback(): void {
    this._navigationService.back();
  }
}
