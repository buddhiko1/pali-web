/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import {
  AccountInitMutationVariables,
  LoginMutationVariables,
} from 'src/gql/graphql';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css'],
})
export class InitComponent implements OnInit, AfterViewInit {
  @ViewChild('initBtn')
  initBtn!: ElementRef<HTMLCanvasElement>;
  UrlEnum: typeof UrlEnum = UrlEnum;
  form!: FormGroup;
  error = '';
  private _token = '';
  private _isInitialized = false;

  constructor(
    private _accountService: AccountService,
    private _route: ActivatedRoute
  ) {
    this._route.queryParams.subscribe((params) => {
      this._token = params['token'];
    });
  }

  ngOnInit(): void {
    const tokenInfo = JSON.parse(window.atob(this._token.split('.')[1]));
    const email = tokenInfo.email;
    this.form = new FormGroup({
      email: new FormControl({ value: email, disabled: true }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'blur',
      }),
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.initBtn.nativeElement, 'click')
      .pipe(throttleTime(1000))
      .subscribe(() => {
        this._isInitialized ? this.initAccount() : this.initAccount();
      });
  }

  get password() {
    return this.form.get('password')!;
  }

  initAccount(): void {
    const args: AccountInitMutationVariables = {
      token: this._token,
      password: this.form.getRawValue().password,
    };
    this._accountService.InitAccount(args).then(() => {
      this._isInitialized = true;
      console.log('Account init success');
    });
  }

  login(): void {
    const args: LoginMutationVariables = {
      email: this.form.getRawValue().email,
      password: this.form.getRawValue().password,
    };
    this._accountService
      .login(args)
      .then(() => {
        console.log('login successful');
        this.error = '';
      })
      .catch((error) => {
        this.error = error.message;
      });
  }
}
