import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CombinedError } from '@urql/core';

import { LoaderComponent } from 'src/app/ui/loader/loader.component';
import { FormDialogComponent } from 'src/app/ui/form-dialog/form-dialog.component';
import { InfoDialogComponent } from 'src/app/ui/info-dialog/info-dialog.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { PromptEnum } from 'src/app/shared/values/prompts.values';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoaderComponent,
    FormDialogComponent,
    InfoDialogComponent,
  ],
})
export class PasswordResetComponent implements OnInit {
  form!: FormGroup;

  private _token = '';
  private _email = '';

  isLoading = false;
  error = '';
  successInfo = '';

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _navigationService: NavigationService,
    private _storageService: StorageService,
    private _authService: AuthService,
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
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
    return this.form.get('password')!;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this._authService
      .resetPassword({
        token: this._token,
        password: this.form.getRawValue().password,
      })
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
    await this._authService.logout({
      tokenForRefresh: this._storageService.tokenForRefresh,
    });
    this._storageService.clearAccountData();
    this._router.navigate(['/auth/login']);
  }
}
