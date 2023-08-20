/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import {
  InitAccountMutationVariables,
  LoginMutationVariables,
} from 'src/gql/graphql';

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
  private _email = '';

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _accountService: AccountService
  ) {
    this._activeRoute.queryParams.subscribe((params) => {
      this._token = params['token'];
      this._email = JSON.parse(
        window.atob(params['token'].split('.')[1])
      ).email;
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl({ value: this._email, disabled: true }),
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
    const password = this.form.getRawValue().password;
    const args: InitAccountMutationVariables = {
      token: this._token,
      password: password,
    };
    this._accountService.initAccount(args).then(() => {
      const args: LoginMutationVariables = {
        email: this._email,
        password: password,
      };
      this._accountService.login(args).then(() => {
        this._router.navigate([`../${UrlEnum.Profile}`], {
          relativeTo: this._activeRoute,
        });
      });
    });
  }
}
