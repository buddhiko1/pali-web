import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { LoaderComponent } from 'src/app/ui/loader/loader.component';
import { FormDialogComponent } from 'src/app/ui/form-dialog/form-dialog.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrl: './user-activation.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent, FormDialogComponent],
})
export class UserActivationComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;

  private _token = '';
  private _email = '';

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService,
    private _navigationService: NavigationService,
    private _notificationService: NotificationsService,
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
    this.isLoading = true;
    this._usersService
      .activeUser({
        token: this._token,
        password: this.form.getRawValue().password,
      })
      .then(() => {
        this._notificationService.pushSuccessInfo({
          title: 'Activiation Successful',
          content: 'Your account activation is now complete!',
        });
        this._router.navigate(['/auth/login']);
      })
      .catch((error) => {
        this._notificationService.pushErrorInfo({
          title: 'Activiation Error',
          content: error.toString(),
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  onResultDialogClick(): void {
    this._navigationService.goBack();
  }
}
