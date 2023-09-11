/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { RequestResetMutationVariables } from 'src/gql/graphql';

import { environment } from 'src/environments/environment';
import { UrlEnum as AppUrlEnum } from 'src/app/app-routing.module';
import { NavigationService } from 'src/app/core/navigation.service';
import { StatusEnum as PromptStatusEnum } from 'src/app/prompt/prompt.component';

import { UrlEnum as AccountUrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { RegisteredEmailValidator } from '../email.validator';

@Component({
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrls: ['./reset-request.component.css'],
})
export class ResetRequestComponent implements OnInit, AfterViewInit {
  @ViewChild('requestBtn')
  requestBtn!: ElementRef<HTMLCanvasElement>;
  AccountUrlEnum = AccountUrlEnum;
  form!: FormGroup;

  constructor(
    private _accountService: AccountService,
    private _registeredEmailValidator: RegisteredEmailValidator,
    private _navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this._registeredEmailValidator.validate.bind(
            this._registeredEmailValidator
          ),
        ],
        updateOn: 'blur',
      }),
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.requestBtn.nativeElement, 'click')
      .pipe(throttleTime(1000))
      .subscribe(() => this.request());
  }

  get email() {
    return this.form.get('email')!;
  }

  request(): void {
    const args: RequestResetMutationVariables = {
      email: this.form.getRawValue().email,
      urlForReset: `${environment.clientHost}/${AppUrlEnum.Account}/${AccountUrlEnum.PasswordReset}`, // confiured in the config.json of pali-cms.
    };
    this._accountService.requestReset(args).then(() => {
      console.log('request sent');
      this._navigationService.back();
    });
  }
}
