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

import { UsersInviteMutationVariables } from 'src/gql/graphql';
import { environment } from 'src/environments/environment';
import { UrlEnum as ModuleUrlEnum } from 'src/app/app-routing.module';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, AfterViewInit {
  @ViewChild('signUpBtn')
  signUpBtn!: ElementRef<HTMLCanvasElement>;
  UrlEnum: typeof UrlEnum = UrlEnum;
  signUpForm!: FormGroup;

  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
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
    return this.signUpForm.get('email')!;
  }

  signUp(): void {
    const inviteArgs: UsersInviteMutationVariables = {
      email: this.signUpForm.getRawValue().email,
      role: `${environment.roleIdToSignUp}`,
      invite_url: `${environment.host}/${ModuleUrlEnum.Account}/${this.UrlEnum.Invite}`,
    };
    this._accountService.invite(inviteArgs).then(() => {
      console.log('SignUp successful');
    });
  }
}
