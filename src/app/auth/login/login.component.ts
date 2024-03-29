import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { LoaderComponent } from 'src/app/ui/loader/loader.component';
import { FormDialogComponent } from 'src/app/ui/form-dialog/form-dialog.component';
import { UnRegisteredEmailValidator } from 'src/app/users/email.validator';
import { StorageService } from 'src/app/shared/services/storage.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { UsersService } from 'src/app/users/users.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    LoaderComponent,
    FormDialogComponent,
  ],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;

  constructor(
    private _router: Router,
    private _storageService: StorageService,
    private _authService: AuthService,
    private _usersService: UsersService,
    private _unRegisteredEmailValidator: UnRegisteredEmailValidator,
    private _notificationService: NotificationsService,
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
    return this.form.get('email')!;
  }

  get password() {
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
      .then((authTokens) => {
        this._storageService.saveAuthTokens(authTokens);
        return this._usersService.fetchAccount();
      })
      .then((account) => {
        this._storageService.account = account;
        return this._usersService.fetchUserProfile({
          userId: account.id,
        });
      })
      .then((profile) => {
        this._storageService.profile = profile;
      })
      .then(() => {
        this._router.navigate([
          '/users/detail',
          this._storageService.account.id,
        ]);
      })
      .catch((error) => {
        this.isLoading = false;
        this._notificationService.pushErrorInfo({
          title: 'Login Error',
          content: error.toString(),
        });
      });
  }
}
