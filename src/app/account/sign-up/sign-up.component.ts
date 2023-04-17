/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DuplicateEmailValidator } from '../shared/email.validator';
import { UrlEnum } from '../account-routing.module';

@Component({
  selector: 'app-login',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  UrlEnum: typeof UrlEnum = UrlEnum;
  signUpForm!: FormGroup;

  constructor(private _duplicateEamilValidator: DuplicateEmailValidator) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this._duplicateEamilValidator.validate.bind(
            this._duplicateEamilValidator
          ),
        ],
        updateOn: 'blur',
      }),
    });
  }

  get email() {
    return this.signUpForm.get('email')!;
  }

  signUp(): void {
    console.log(this.signUpForm.getRawValue());
  }
}
