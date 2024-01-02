import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CombinedError } from '@urql/core';

import { LoadingComponent } from 'src/app/ui/loading/loading.component';
import { FormDialogComponent } from 'src/app/ui/form-dialog/form-dialog.component';
import { InfoDialogComponent } from 'src/app/ui/info-dialog/info-dialog.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UrlService } from 'src/app/shared/services/url.service';
import { UsersService } from '../users.service';
import { ActiveUserMutationVariables } from 'src/gql/graphql';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrl: './user-activation.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingComponent,
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
    private _activeRoute: ActivatedRoute,
    private _usersService: UsersService,
    private _urlService: UrlService,
    private _navigationService: NavigationService,
  ) {
    this._activeRoute.queryParams.subscribe((params) => {
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('password')!;
  }

  onSubmit(): void {
    this.isLoading = true;
    const args: ActiveUserMutationVariables = {
      token: this._token,
      password: this.form.getRawValue().password,
    };
    this._usersService
      .activeUser(args)
      .then(() => {
        this.isLoading = false;
        this._router.navigateByUrl(this._urlService.urlForLogin);
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
