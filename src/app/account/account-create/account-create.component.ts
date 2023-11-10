import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { CreateAccountMutationVariables } from 'src/gql/graphql';
import { NavigationService } from 'src/app/core/navigation.service';
import { RoleEnum } from 'src/app/core/value.cms';
import { PromptEnum } from 'src/app/core/prompts.interaction';
import {
  StatusEnum as LoaderStatusEnum,
  LoaderComponent,
} from 'src/app/loader/loader.component';
import { SliderDirective } from 'src/app/core/slider.directive';
import { OverlayComponent } from 'src/app/overlay/overlay.component';
import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { RegisteredEmailValidator } from '../email.validator';
import { RoleFieldsFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrl: './account-create.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    OverlayComponent,
    SliderDirective,
    LoaderComponent,
  ],
})
export class AccountCreateComponent implements OnInit {
  form!: FormGroup;
  UrlEnum = UrlEnum;

  loaderStatus = LoaderStatusEnum.Idle;
  loaderPrompt = '';

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

  get isLoaderActived(): boolean {
    return this.loaderStatus !== LoaderStatusEnum.Idle;
  }

  get email() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('email')!;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    const roles: RoleFieldsFragment[] = await this._accountService.fetchRoles();
    const role = roles.find((role) => role.name === RoleEnum.User);
    if (!role) {
      throw new Error('user role not founded');
    }
    const args: CreateAccountMutationVariables = {
      email: this.form.getRawValue().email,
      role: role.id,
      urlForInit: `${location.protocol}//${location.host}/account/${UrlEnum.AccountInit}`, // confiured in the config.json of pali-cms.
    };

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

  routeToLogin(): void {
    this._router.navigate([`../${UrlEnum.Login}`], {
      relativeTo: this._activeRoute,
    });
  }
}
