import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { timer } from 'rxjs';
import { CombinedError } from '@urql/core';

import { InfoEnum } from 'src/app/core/public.value';
import { LoadingComponent } from 'src/app/loading/loading.component';
import { FormDialogComponent } from 'src/app/dialog/form/form.component';
import { InfoDialogComponent } from 'src/app/dialog/info/info.component';
import { CreateAccountMutationVariables } from 'src/gql/graphql';
import { NavigationService } from 'src/app/core/navigation.service';
import { RoleEnum } from 'src/app/core/value.cms';
import { PromptEnum } from 'src/app/core/prompts.interaction';
import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { RegisteredEmailValidator } from '../email.validator';
import { RoleFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrl: './account-create.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingComponent,
    FormDialogComponent,
    InfoDialogComponent,
  ],
})
export class AccountCreateComponent implements OnInit {
  form!: FormGroup;
  UrlEnum = UrlEnum;
  InfoEnum = InfoEnum;

  isLoading = false;
  error = '';
  successInfo = '';

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _accountService: AccountService,

    private _registeredEmailValidator: RegisteredEmailValidator,
    private _navigationService: NavigationService,
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
  }

  get email() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('email')!;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    const roles: RoleFragment[] = await this._accountService.fetchRoles();
    const role = roles.find((role) => role.name === RoleEnum.User);
    if (!role) {
      throw new Error('user role not founded');
    }
    const args: CreateAccountMutationVariables = {
      email: this.form.getRawValue().email,
      role: role.id,
      urlForInit: `${location.origin}/account/${UrlEnum.AccountInit}`, // confiured in the config.json of pali-cms.
    };

    this.isLoading = true;

    this._accountService
      .createAccount(args)
      .then(() => {
        // wait for 3 seconds for user to receive the email.
        timer(3000).subscribe(() => {
          this.isLoading = false;
          this.successInfo = PromptEnum.SignUp;
        });
      })
      .catch((error: CombinedError) => {
        this.isLoading = false;
        this.error =
          error.networkError?.message ?? error.graphQLErrors[0].message;
      });
  }

  routeToLogin(): void {
    this._router.navigate([`../${UrlEnum.Login}`], {
      relativeTo: this._activeRoute,
    });
  }

  onErrorDialogSubmit(): void {
    this._navigationService.goBack();
  }

  onSuccessDialogSubmit(): void {
    this.routeToLogin();
  }
}
