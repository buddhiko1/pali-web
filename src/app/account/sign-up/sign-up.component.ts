/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UrlEnum } from '../account-routing.module';

@Component({
  selector: 'app-login',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  UrlEnum: typeof UrlEnum = UrlEnum;
  signUpForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
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
