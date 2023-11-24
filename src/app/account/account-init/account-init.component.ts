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
import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import {
  InitAccountMutationVariables,
  LoginMutationVariables,
} from 'src/gql/graphql';

@Component({
  selector: 'app-account-init',
  templateUrl: './account-init.component.html',
  styleUrl: './account-init.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingComponent,
    FormDialogComponent,
    InfoDialogComponent,
  ],
})
export class AccountInitComponent implements OnInit {
  UrlEnum = UrlEnum;
  form!: FormGroup;

  private _token = '';
  private _email = '';

  InfoEnum = InfoEnum;
  isLoading = false;
  error = '';

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
    this.isLoading = true;
    const args: InitAccountMutationVariables = {
      token: this._token,
      password: this.form.getRawValue().password,
    };
    this._accountService
      .initAccount(args)
      .then(() => {
        this.isLoading = false;
        this.login();
      })
      .catch((error: CombinedError) => {
        this.isLoading = false;
        this.error =
          error.networkError?.message ?? error.graphQLErrors[0].message;
      });
  }

  login(): void {
    const args: LoginMutationVariables = {
      email: this._email,
      password: this.form.getRawValue().password,
    };
    this._accountService.login(args).then(() => {
      this._router.navigate([`../${UrlEnum.Me}`], {
        relativeTo: this._activeRoute,
      });
    });
  }

  onErrorDialogSubmit(): void {
    this._navigationService.goBack();
  }
}
