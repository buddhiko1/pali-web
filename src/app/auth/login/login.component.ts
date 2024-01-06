import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CombinedError } from '@urql/core';

import { LoadingComponent } from 'src/app/ui/loading/loading.component';
import { FormDialogComponent } from 'src/app/ui/form-dialog/form-dialog.component';
import { InfoDialogComponent } from 'src/app/ui/info-dialog/info-dialog.component';
import { UnRegisteredEmailValidator } from 'src/app/users/shared/email.validator';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    RouterLink,
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
    private _storageService: StorageService,
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
    this.isLoading = true;
    this._authService
      .login({
        email: this.form.getRawValue().email,
        password: this.form.getRawValue().password,
      })
      .then(() => {
        this._usersService.fetchAccount().then(() => {
          this._router.navigate([
            '/users/detail',
            this._storageService.account!.id,
          ]);
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
}
