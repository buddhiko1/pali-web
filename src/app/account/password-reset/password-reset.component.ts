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

import { ResetPasswordMutationVariables } from 'src/gql/graphql';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit, AfterViewInit {
  @ViewChild('resetBtn')
  resetBtn!: ElementRef<HTMLCanvasElement>;
  UrlEnum = UrlEnum;
  form!: FormGroup;
  error = '';
  private _token = '';

  constructor(
    private _router: Router,
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
    fromEvent(this.resetBtn.nativeElement, 'click')
      .pipe(throttleTime(1000))
      .subscribe(() => {
        this.resetPassword();
      });
  }

  get password() {
    return this.form.get('password')!;
  }

  resetPassword(): void {
    const args: ResetPasswordMutationVariables = {
      token: this._token,
      password: this.form.getRawValue().password,
    };
    this._accountService.resetPassword(args).then(() => {
      this._router.navigate(['../'], { relativeTo: this._activeRoute });
    });
  }
}
