import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CombinedError } from '@urql/core';

import { InfoEnum } from 'src/app/core/public.value';
import { LoadingComponent } from 'src/app/loading/loading.component';
import { FormDialogComponent } from 'src/app/dialog/form/form.component';
import { InfoDialogComponent } from 'src/app/dialog/info/info.component';
import { NavigationService } from 'src/app/core/navigation.service';
import { PromptEnum } from 'src/app/core/prompts.interaction';
import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { UnRegisteredEmailValidator } from '../email.validator';
import { RequestResetMutationVariables } from 'src/gql/graphql';

@Component({
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrl: './reset-request.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingComponent,
    FormDialogComponent,
    InfoDialogComponent,
  ],
})
export class ResetRequestComponent implements OnInit {
  form!: FormGroup;

  InfoEnum = InfoEnum;
  isLoading = false;
  error = '';
  successInfo = '';

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

  get email() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('email')!;
  }

  onSubmit(): void {
    const args: RequestResetMutationVariables = {
      email: this.form.getRawValue().email,
      urlForReset: `${location.origin}/account/${UrlEnum.PasswordReset}`, // confiured in the config.json of pali-cms.
    };

    this.isLoading = true;
    this._accountService
      .requestReset(args)
      .then(() => {
        this.isLoading = false;
        this.successInfo = PromptEnum.RequestReset;
      })
      .catch((error: CombinedError) => {
        this.isLoading = false;
        this.error =
          error.networkError?.message ?? error.graphQLErrors[0].message;
      });
  }

  onErrorDialogSubmit(): void {
    this._navigationService.goBack();
  }

  onSuccessDialogSubmit(): void {
    this._navigationService.goBack();
  }
}
