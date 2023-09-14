import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CreateAccountMutationVariables } from 'src/gql/graphql';
import { environment } from 'src/environments/environment';
import { NavigationService } from 'src/app/core/navigation.service';
import { PromptEnum } from 'src/app/core/prompts.interaction';
import { StatusEnum as LoaderStatusEnum } from 'src/app/loader/loader.component';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { RegisteredEmailValidator } from '../email.validator';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css'],
})
export class AccountCreateComponent implements OnInit {
  form!: FormGroup;
  UrlEnum = UrlEnum;

  isSubmitted = false;
  loaderStatus = LoaderStatusEnum.Idle;
  loaderPrompt = '';

  constructor(
    private _accountService: AccountService,
    private _registeredEmailValidator: RegisteredEmailValidator,
    private _navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this._registeredEmailValidator.validate.bind(
            this._registeredEmailValidator
          ),
        ],
        updateOn: 'change',
      }),
    });
  }

  get email() {
    return this.form.get('email')!;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const args: CreateAccountMutationVariables = {
      email: this.form.getRawValue().email,
      role: `${environment.roleIdToSignUp}`,
      urlForInit: `${environment.clientHost}/account/${UrlEnum.AccountInit}`, // confiured in the config.json of pali-cms.
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
}
