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

import { InitAccountMutationVariables } from 'src/gql/graphql';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-init',
  templateUrl: './account-init.component.html',
  styleUrls: ['./account-init.component.css'],
})
export class AccountInitComponent implements OnInit, AfterViewInit {
  @ViewChild('initBtn')
  initBtn!: ElementRef<HTMLCanvasElement>;
  UrlEnum = UrlEnum;
  form!: FormGroup;
  error = '';
  private _token = '';

  constructor(
    private _accountService: AccountService,
    private _activeRoute: ActivatedRoute
  ) {
    this._activeRoute.queryParams.subscribe((params) => {
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
        this.initAccount();
      });
  }

  get password() {
    return this.form.get('password')!;
  }

  initAccount(): void {
    const args: InitAccountMutationVariables = {
      token: this._token,
      password: this.form.getRawValue().password,
    };
    this._accountService.initAccount(args).then(() => {
      // direct to login
    });
  }
}
