import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ResetPasswordMutationVariables } from 'src/gql/graphql';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingComponent,
    FormDialogComponent,
    InfoDialogComponent,
  ],
})
export class PasswordResetComponent implements OnInit {
  UrlEnum = UrlEnum;
  form!: FormGroup;

  private _token = '';
  private _email = '';

  InfoEnum = InfoEnum;
  isLoading = false;
  error = '';
  successInfo = '';

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

  get password() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('password')!;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const args: ResetPasswordMutationVariables = {
      token: this._token,
      password: this.form.getRawValue().password,
    };

    this.isLoading = true;
    this._accountService
      .resetPassword(args)
      .then(() => {
        this.isLoading = false;
        this.successInfo = PromptEnum.Reset;
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

  async onSuccessDialogSubmit(): Promise<void> {
    await this._accountService.logout();
    this._router.navigate([`../${UrlEnum.Login}`], {
      relativeTo: this._activeRoute,
    });
  }
}
