import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SlideInDirective } from 'src/app/core/slide-in.directive';
import { OverlayComponent } from 'src/app/overlay/overlay.component';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { LoadingComponent } from 'src/app/loading/loading.component';
import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { UnRegisteredEmailValidator } from '../email.validator';
import { LoginMutationVariables } from 'src/gql/graphql';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    OverlayComponent,
    SlideInDirective,
    LoadingComponent,
    DialogComponent,
  ],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  UrlEnum = UrlEnum;

  isLoading = false;
  error = '';

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _accountService: AccountService,
    private _unRegisteredEmailValidator: UnRegisteredEmailValidator,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this._unRegisteredEmailValidator.validate.bind(
            this._unRegisteredEmailValidator,
          ),
        ],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'change',
      }),
    });
  }

  get email() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('email')!;
  }

  get password() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('password')!;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const args: LoginMutationVariables = {
      email: this.form.getRawValue().email,
      password: this.form.getRawValue().password,
    };

    this.isLoading = true;

    this._accountService
      .login(args)
      .then(() => {
        this.isLoading = false;
        this.routeToMe();
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.toString();
      });
  }

  routeToMe(): void {
    this._router.navigate([`../${UrlEnum.Me}`], {
      relativeTo: this._activeRoute,
    });
  }

  onErrorDialogSubmit(): void {
    this.isLoading = false;
    this.error = '';
  }

  onRequestReset(): void {
    this._router.navigate([`../${UrlEnum.ResetRequest}`], {
      relativeTo: this._activeRoute,
    });
  }

  onCreateAccount(): void {
    this._router.navigate([`../${UrlEnum.AccountCreate}`], {
      relativeTo: this._activeRoute,
    });
  }
}
