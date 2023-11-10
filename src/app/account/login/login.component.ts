import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  StatusEnum as LoaderStatusEnum,
  LoaderComponent,
} from 'src/app/loader/loader.component';
import { SliderDirective } from 'src/app/core/slider.directive';
import { OverlayComponent } from 'src/app/overlay/overlay.component';
import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { UnRegisteredEmailValidator } from '../email.validator';
import { LoginMutationVariables } from 'src/gql/graphql';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    OverlayComponent,
    SliderDirective,
    LoaderComponent,
  ],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  UrlEnum = UrlEnum;

  loaderStatus = LoaderStatusEnum.Idle;
  loaderPrompt = '';

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _accountService: AccountService,
    private _unRegisteredEmailValidator: UnRegisteredEmailValidator,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this._unRegisteredEmailValidator.validate.bind(
            this._unRegisteredEmailValidator,
          ),
        ],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'change',
      }),
    });
  }

  get isLoaderActived(): boolean {
    return this.loaderStatus !== LoaderStatusEnum.Idle;
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

    this.loaderStatus = LoaderStatusEnum.Loading;

    this._accountService
      .login(args)
      .then(() => {
        this.loaderStatus = LoaderStatusEnum.Successful;
      })
      .catch((error) => {
        this.loaderStatus = LoaderStatusEnum.Failed;
        this.loaderPrompt = error.toString();
      });
  }

  reEdit(): void {
    this.loaderStatus = LoaderStatusEnum.Idle;
  }

  routeToMe(): void {
    this._router.navigate([`../${UrlEnum.Me}`], {
      relativeTo: this._activeRoute,
    });
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
