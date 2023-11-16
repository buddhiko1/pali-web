import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { timer } from 'rxjs';

import { CreateAccountMutationVariables } from 'src/gql/graphql';
import { NavigationService } from 'src/app/core/navigation.service';
import { RoleEnum } from 'src/app/core/value.cms';
import { PromptEnum } from 'src/app/core/prompts.interaction';
import { LoaderComponent } from 'src/app/loader/loader.component';
import { SlideInDirective } from 'src/app/core/slide-in.directive';
import { OverlayComponent } from 'src/app/overlay/overlay.component';
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
    OverlayComponent,
    SlideInDirective,
    LoaderComponent,
  ],
})
export class AccountCreateComponent implements OnInit {
  form!: FormGroup;
  UrlEnum = UrlEnum;

  showLoader = false;
  errorInfo = '';
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

    this.showLoader = true;

    this._accountService
      .createAccount(args)
      .then(() => {
        // wait for 3 seconds for user to receive the email.
        timer(3000).subscribe(() => {
          this.successInfo = PromptEnum.SignUp;
        });
      })
      .catch((error) => {
        this.errorInfo = error.toString();
      });
  }

  routeToLogin(): void {
    this._router.navigate([`../${UrlEnum.Login}`], {
      relativeTo: this._activeRoute,
    });
  }

  onActionDone(): void {
    if (this.successInfo) {
      this.routeToLogin();
    } else {
      this._navigationService.goBack();
    }
  }
}
