import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { LoaderComponent } from 'src/app/ui/loader/loader.component';
import { FormDialogComponent } from 'src/app/ui/form-dialog/form-dialog.component';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { PromptEnum } from 'src/app/shared/values/prompts.values';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent, FormDialogComponent],
})
export class PasswordResetComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;

  private _token = '';
  private _email = '';

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _notificationService: NotificationsService,
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
        this._notificationService.pushSuccessInfo({
          title: 'Reset Successful',
          content: PromptEnum.Reset,
        });
      })
      .then(() => {
        //TODO waiting for directus to fix bug
        // this._authService.logout({
        //   tokenForRefresh: this._storageService.tokenForRefresh,
        // });
        this._storageService.clearAccountData();
        this._router.navigate(['/auth/login']);
      })
      .catch((error) => {
        this._notificationService.pushErrorInfo({
          title: 'Reset Error',
          content: error.toString(),
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
