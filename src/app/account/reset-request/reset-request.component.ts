import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RequestResetMutationVariables } from 'src/gql/graphql';

import { NavigationService } from 'src/app/core/navigation.service';
import { PromptEnum } from 'src/app/core/prompts.interaction';
import { StatusEnum as LoaderStatusEnum } from 'src/app/loader/loader.component';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { UnRegisteredEmailValidator } from '../email.validator';

@Component({
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrls: ['./reset-request.component.css'],
})
export class ResetRequestComponent implements OnInit {
  form!: FormGroup;

  loaderStatus = LoaderStatusEnum.Idle;
  loaderPrompt = '';

  constructor(
    private _accountService: AccountService,
    private _unregisteredEmailValidator: UnRegisteredEmailValidator,
    private _navigationService: NavigationService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this._unregisteredEmailValidator.validate.bind(
            this._unregisteredEmailValidator,
          ),
        ],
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

  onSubmit(): void {
    const args: RequestResetMutationVariables = {
      email: this.form.getRawValue().email,
      urlForReset: `${location.protocol}//${location.host}/account/${UrlEnum.PasswordReset}`, // confiured in the config.json of pali-cms.
    };

    this.loaderStatus = LoaderStatusEnum.Loading;

    this._accountService
      .requestReset(args)
      .then(() => {
        this.loaderStatus = LoaderStatusEnum.Successful;
        this.loaderPrompt = PromptEnum.RequestReset;
      })
      .catch((error) => {
        this.loaderStatus = LoaderStatusEnum.Failed;
        this.loaderPrompt = error.toString();
      });
  }

  goBack(): void {
    this._navigationService.back();
  }
}
