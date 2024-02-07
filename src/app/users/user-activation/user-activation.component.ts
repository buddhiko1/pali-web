import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrl: './user-activation.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoaderComponent,
    FormDialogComponent,
    InfoDialogComponent,
  ],
})
export class UserActivationComponent implements OnInit {
  form!: FormGroup;

  private _token = '';
  private _email = '';

  isLoading = false;
  error = '';

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService,
    private _navigationService: NavigationService,
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
        this.isLoading = false;
        this._router.navigate(['/auth/login']);
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
}
