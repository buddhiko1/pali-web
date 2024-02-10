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
import { ResultDialogComponent } from 'src/app/ui/result-dialog/result-dialog.component';
import { UnRegisteredEmailValidator } from 'src/app/users/email.validator';
import { StorageService } from 'src/app/shared/services/storage.service';
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
    ResultDialogComponent,
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
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    try {
      const authTokens = await this._authService.login({
        email: this.form.getRawValue().email,
        password: this.form.getRawValue().password,
      });
      this._storageService.saveAuthTokens(authTokens);
      const account = await this._usersService.fetchAccount();
      this._storageService.account = account;
      const profile = await this._usersService.fetchUserProfile({
        userId: account.id,
      });
      this._storageService.profile = profile;
      this._router.navigate(['/users/detail', account.id]);
    } catch (error: any) {
      this.isLoading = false;
      this.error =
        error.networkError?.message ?? error.graphQLErrors[0].message;
    }
  }

  onResultDialogClick(): void {
    this.error = '';
  }
}
