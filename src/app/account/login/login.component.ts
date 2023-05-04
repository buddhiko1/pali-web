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
import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';
import { AuthLoginMutationVariables } from '../../gql/graphql';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('loginBtn')
  loginBtn!: ElementRef<HTMLCanvasElement>;
  UrlEnum: typeof UrlEnum = UrlEnum;
  loginForm!: FormGroup;
  loginError = '';

  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
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
    const loginArgs: AuthLoginMutationVariables = {
      email: this.loginForm.getRawValue().email,
      password: this.loginForm.getRawValue().password,
    };
    this._accountService
      .login(loginArgs)
      .then(() => {
        console.log('login successful');
      })
      .catch((error) => {
        this.loginError = error.message;
      });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}
