import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { NavigationService } from 'src/app/core/navigation.service';
import { PromptEnum } from 'src/app/core/prompts.interaction';
import { LoaderComponent } from 'src/app/loader/loader.component';
import { SliderDirective } from 'src/app/core/slider.directive';
import { OverlayComponent } from 'src/app/overlay/overlay.component';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { UnRegisteredEmailValidator } from '../email.validator';
import { RequestResetMutationVariables } from 'src/gql/graphql';

@Component({
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrl: './reset-request.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    OverlayComponent,
    SliderDirective,
    LoaderComponent,
  ],
})
export class ResetRequestComponent implements OnInit {
  form!: FormGroup;

  showLoader = false;
  errorInfo = '';
  successInfo = '';

  constructor(
    private _accountService: AccountService,
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
    const args: RequestResetMutationVariables = {
      email: this.form.getRawValue().email,
      urlForReset: `${location.protocol}//${location.host}/account/${UrlEnum.PasswordReset}`, // confiured in the config.json of pali-cms.
    };

    this.showLoader = true;

    this._accountService
      .requestReset(args)
      .then(() => {
        this.successInfo = PromptEnum.RequestReset;
      })
      .catch((error) => {
        this.errorInfo = error.toString();
      });
  }

  onActionDone(): void {
    this._navigationService.back();
  }
}
