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

import { SignUpMutationVariables } from 'src/gql/graphql';
import { environment } from 'src/environments/environment';
import { UrlEnum as AppUrlEnum } from 'src/app/app-routing.module';
import { StatusEnum as LoaderEnum } from 'src/app/mark-loader/mark-loader.component';

import { UrlEnum as AccountUrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { UnregisteredEmailValidator } from '../email.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, AfterViewInit {
  @ViewChild('signUpBtn')
  signUpBtn!: ElementRef<HTMLCanvasElement>;
  AccountUrlEnum = AccountUrlEnum;
  form!: FormGroup;

  constructor(
    private _accountService: AccountService,
    private _unregisteredEmailValidator: UnregisteredEmailValidator
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
      .subscribe(() => this.signUp());
  }

  get email() {
    return this.form.get('email')!;
  }

  get validatorStatusOfEmail() {
    console.log('email status:', this.email.status);
    if (this.email.pending) {
      return LoaderEnum.Loading;
    } else if (this.email.valid) {
      return LoaderEnum.Successful;
    } else if (this.email.invalid) {
      return LoaderEnum.Failed;
    } else {
      return LoaderEnum.Idle;
    }
  }

  signUp(): void {
    const args: SignUpMutationVariables = {
      email: this.form.getRawValue().email,
      role: `${environment.roleIdToSignUp}`,
      urlForInit: `${environment.host}/${AppUrlEnum.Account}/${AccountUrlEnum.Init}`,
    };
    this._accountService.signUp(args).then(() => {
      console.log('SignUp successful');
    });
  }
}
