import { Component, OnInit } from '@angular/core';
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
import { PromptEnum } from 'src/app/shared/values/prompts.values';
import { UnRegisteredEmailValidator } from 'src/app/users/shared/email.validator';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrl: './reset-request.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoaderComponent,
    FormDialogComponent,
    InfoDialogComponent,
  ],
})
export class ResetRequestComponent implements OnInit {
  form!: FormGroup;

  isLoading = false;
  error = '';
  successInfo = '';

  constructor(
    private _authService: AuthService,
    private _unregisteredEmailValidator: UnRegisteredEmailValidator,
    private _navigationService: NavigationService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this._unregisteredEmailValidator.validate.bind(
            this._unregisteredEmailValidator,
          ),
        ],
        updateOn: 'change',
      }),
    });
  }

  get email() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('email')!;
  }

  onSubmit(): void {
    this.isLoading = true;
    this._authService
      .requestPasswordReset({
        email: this.form.getRawValue().email,
        urlForReset: `${location.origin}/auth/password-reset`,
      })
      .then(() => {
        this.isLoading = false;
        this.successInfo = PromptEnum.RequestReset;
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

  onSuccessDialogSubmit(): void {
    this._navigationService.goBack();
  }
}
