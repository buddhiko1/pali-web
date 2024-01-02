import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CombinedError } from '@urql/core';

import { LoadingComponent } from 'src/app/ui/loading/loading.component';
import { FormDialogComponent } from 'src/app/ui/form-dialog/form-dialog.component';
import { InfoDialogComponent } from 'src/app/ui/info-dialog/info-dialog.component';
import { UnRegisteredEmailValidator } from 'src/app/users/shared/email.validator';
import { UrlService } from 'src/app/shared/services/url.service';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/app/users/users.service';
import { LoginMutationVariables } from 'src/gql/graphql';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingComponent,
    FormDialogComponent,
    InfoDialogComponent,
  ],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  isLoading = false;
  error = '';

  constructor(
    private _router: Router,
    private _urlService: UrlService,
    private _authService: AuthService,
    private _usersService: UsersService,
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

    this._authService
      .login(args)
      .then(() => {
        this._usersService.fetchMe().then(() => {
          this._router.navigateByUrl('users/me');
        });
      })
      .catch((error: CombinedError) => {
        this.isLoading = false;
        this.error =
          error.networkError?.message ?? error.graphQLErrors[0].message;
      });
  }

  onErrorDialogSubmit(): void {
    this.error = '';
  }

  onPasswordRequestReset(): void {
    this._router.navigateByUrl(this._urlService.urlForRequestPasswordReset);
  }

  onCreateUser(): void {
    this._router.navigateByUrl(this._urlService.urlForCreateUser);
  }
}
