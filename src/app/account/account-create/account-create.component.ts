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
  AccountUrlEnum = AccountUrlEnum;
  form!: FormGroup;

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
    const args: CreateAccountMutationVariables = {
      email: this.form.getRawValue().email,
      role: `${environment.roleIdToSignUp}`,
      urlForInit: `${environment.host}/${AppUrlEnum.Account}/${AccountUrlEnum.AccountInit}`, // confiured in the config.json of pali-cms.
    };
    this._accountService.createAccount(args).then(() => {
      console.log('create account successfully!');
      this._navigationService.back();
    });
  }
}
