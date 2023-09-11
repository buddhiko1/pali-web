import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CreateAccountMutationVariables } from 'src/gql/graphql';
import { environment } from 'src/environments/environment';
import { UrlEnum as AppUrlEnum } from 'src/app/app-routing.module';
import { NavigationService } from 'src/app/core/navigation.service';
import { PromptEnum } from 'src/app/core/prompts.interaction';
import { StatusEnum as LoaderStatusEnum } from 'src/app/loader/loader.component';

import { UrlEnum as AccountUrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { UnregisteredEmailValidator } from '../email.validator';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css'],
})
export class AccountCreateComponent implements OnInit {
  form!: FormGroup;
  AccountUrlEnum = AccountUrlEnum;
  isSubmitted = false;
  loaderStatus = LoaderStatusEnum.Idle;
  loaderPrompt = '';

  constructor(
    private _accountService: AccountService,
    private _unregisteredEmailValidator: UnregisteredEmailValidator,
    private _navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this._unregisteredEmailValidator.validate.bind(
            this._unregisteredEmailValidator
          ),
        ],
        updateOn: 'blur',
      }),
    });
  }

  get email() {
    return this.form.get('email')!;
  }

  submit(): void {
    this.isSubmitted = true;
    this.loaderStatus = LoaderStatusEnum.Loading;

    // wait for 5 seconds for user to receive the email.
    setTimeout(() => {
      this.loaderStatus = LoaderStatusEnum.Successful;
      this.loaderPrompt = PromptEnum.SignUp;
    }, 5000);
    // const args: CreateAccountMutationVariables = {
    //   email: this.form.getRawValue().email,
    //   role: `${environment.roleIdToSignUp}`,
    //   urlForInit: `${environment.host}/${AppUrlEnum.Account}/${AccountUrlEnum.AccountInit}`, // confiured in the config.json of pali-cms.
    // };
    //
    // this._accountService
    //   .createAccount(args)
    //   .then(() => {
    //     // wait for 5 seconds for user to receive the email.
    //     setTimeout(() => {
    //       this.loaderStatus = LoaderStatusEnum.Successful;
    //       this.loaderPrompt = PromptEnum.SignUp;
    //     }, 5000);
    //   })
    //   .catch((error) => {
    //     this.loaderStatus = LoaderStatusEnum.Failed;
    //     this.loaderPrompt = error.toString();
    //   });
  }

  goback(): void {
    this._navigationService.back();
  }
}
