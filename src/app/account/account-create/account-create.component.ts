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

import { CreateAccountMutationVariables } from 'src/gql/graphql';
import { environment } from 'src/environments/environment';
import { UrlEnum as AppUrlEnum } from 'src/app/app-routing.module';
import { NavigationService } from 'src/app/core/navigation.service';
import { StatusEnum as PromptStatusEnum } from 'src/app/prompt/prompt.component';

import { UrlEnum as AccountUrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { UnregisteredEmailValidator } from '../email.validator';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css'],
})
export class AccountCreateComponent implements OnInit, AfterViewInit {
  @ViewChild('createBtn')
  signUpBtn!: ElementRef<HTMLCanvasElement>;
  form!: FormGroup;
  AccountUrlEnum = AccountUrlEnum;
  isSubmitted = false;
  promptStatus = PromptStatusEnum.Idle;
  promptText = '';

  constructor(
    private _accountService: AccountService,
    private _unregisteredEmailValidator: UnregisteredEmailValidator,
    private _navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this._unregisteredEmailValidator.validate.bind(
            this._unregisteredEmailValidator
          ),
        ],
        updateOn: 'blur',
      }),
    });
    this.isSubmitted = true;
    this.promptStatus = PromptStatusEnum.Progress;
    setTimeout(() => {
      this.promptStatus = PromptStatusEnum.Successful;
      this.promptText = 'Please click the registet link in your email.';
    }, 3000);
  }

  ngAfterViewInit(): void {
    fromEvent(this.signUpBtn.nativeElement, 'click')
      .pipe(throttleTime(1000))
      .subscribe(() => this.create());
  }

  get email() {
    return this.form.get('email')!;
  }

  create(): void {
    // this.isSubmitted = true;
    // this.promptStatus = PromptStatusEnum.Progress;
    // setTimeout(() => {
    //   this.promptStatus = PromptStatusEnum.Successful;
    //   this.promptText = 'Please click the registet link in your email';
    // }, 3000);
    // const args: CreateAccountMutationVariables = {
    //   email: this.form.getRawValue().email,
    //   role: `${environment.roleIdToSignUp}`,
    //   urlForInit: `${environment.host}/${AppUrlEnum.Account}/${AccountUrlEnum.AccountInit}`, // confiured in the config.json of pali-cms.
    // };
    // this._accountService.createAccount(args).then(() => {
    //   this._navigationService.back();
    // });
  }
}
