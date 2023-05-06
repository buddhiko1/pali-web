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

import { AccountInitMutationVariables } from 'src/gql/graphql';

import { UrlEnum } from '../account-routing.module';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css'],
})
export class InitComponent implements OnInit, AfterViewInit {
  @ViewChild('initBtn')
  initBtn!: ElementRef<HTMLCanvasElement>;
  UrlEnum: typeof UrlEnum = UrlEnum;
  initForm!: FormGroup;

  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    this.initForm = new FormGroup({
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
    fromEvent(this.initBtn.nativeElement, 'click')
      .pipe(throttleTime(1000))
      .subscribe(() => this.initAccount());
  }

  get email() {
    return this.initForm.get('email')!;
  }

  get password() {
    return this.initForm.get('password')!;
  }

  initAccount(): void {
    const args: AccountInitMutationVariables = {
      token: 'abc',
      password: this.initForm.getRawValue().password,
    };
    this._accountService.InitAccount(args).then(() => {
      console.log('Account init success');
    });
  }
}
