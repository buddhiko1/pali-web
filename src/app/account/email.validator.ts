import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class UnregisteredEmailValidator implements AsyncValidator {
  constructor(private _accountService: AccountService) {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> {
    return this._accountService
      .isRegisteredEmail(control.value)
      .then((result) => {
        return result ? { unregistered: true } : null;
      })
      .catch(() => null);
  }
}

@Injectable({ providedIn: 'root' })
export class RegisteredEmailValidator implements AsyncValidator {
  constructor(private _accountService: AccountService) {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> {
    return this._accountService
      .isRegisteredEmail(control.value)
      .then((result) => {
        return result ? null : { registered: true };
      })
      .catch(() => null);
  }
}
