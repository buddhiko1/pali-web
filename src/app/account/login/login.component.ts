/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { LoginMutationVariables } from 'src/gql/graphql';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('loginBtn')
  loginBtn!: ElementRef<HTMLCanvasElement>;
  form!: FormGroup;
  UrlEnum = UrlEnum;
  error = '';

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'blur',
      }),
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.loginBtn.nativeElement, 'click')
      .pipe(throttleTime(1000))
      .subscribe(() => this.login());
  }

  login(): void {
    const args: LoginMutationVariables = {
      email: this.form.getRawValue().email,
      password: this.form.getRawValue().password,
    };
    this._accountService
      .login(args)
      .then(() => {
        this._router.navigate([`./${UrlEnum.Profile}`], {
          relativeTo: this._activeRoute,
        });
      })
      .catch((error) => {
        this.error = error.message;
      });
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }
}
