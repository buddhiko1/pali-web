import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CreateAccountMutationVariables } from 'src/gql/graphql';
import { NavigationService } from 'src/app/core/navigation.service';
import { PromptEnum } from 'src/app/core/prompts.interaction';
import { OverlayService } from 'src/app/overlay/overlay.service';
import { StatusEnum as LoaderStatusEnum } from 'src/app/loader/loader.component';
import { environment } from 'src/environments/environment';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { RegisteredEmailValidator } from '../email.validator';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css'],
})
export class AccountCreateComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  UrlEnum = UrlEnum;

  isSubmitted = false;
  loaderStatus = LoaderStatusEnum.Idle;
  loaderPrompt = '';

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _accountService: AccountService,
    private _registeredEmailValidator: RegisteredEmailValidator,
    private _navigationService: NavigationService,
    private _overlayService: OverlayService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this._registeredEmailValidator.validate.bind(
            this._registeredEmailValidator,
          ),
        ],
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

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const args: CreateAccountMutationVariables = {
      email: this.form.getRawValue().email,
      role: `${environment.roleIdToSignUp}`,
      urlForInit: `${environment.client}/account/${UrlEnum.AccountInit}`, // confiured in the config.json of pali-cms.
    };

    this.isSubmitted = true;
    this.loaderStatus = LoaderStatusEnum.Loading;

    this._accountService
      .createAccount(args)
      .then(() => {
        // wait for 3 seconds for user to receive the email.
        setTimeout(() => {
          this.loaderStatus = LoaderStatusEnum.Successful;
          this.loaderPrompt = PromptEnum.SignUp;
        }, 3000);
      })
      .catch((error) => {
        this.loaderStatus = LoaderStatusEnum.Failed;
        this.loaderPrompt = error.toString();
      });
  }

  goback(): void {
    this._navigationService.back();
  }

  onLogin(): void {
    this._router.navigate([`../${UrlEnum.Login}`], {
      relativeTo: this._activeRoute,
    });
  }
}
