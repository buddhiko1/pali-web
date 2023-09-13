import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class UnRegisteredEmailValidator implements AsyncValidator {
  constructor(private _accountService: AccountService) {}

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    return this._accountService
      .isRegisteredEmail(control.value)
      .then((isResgistered) => {
        return isResgistered ? null : { unRegistered: true };
      })
      .catch(() => null);
  }
}

@Injectable({ providedIn: 'root' })
export class RegisteredEmailValidator implements AsyncValidator {
  constructor(private _accountService: AccountService) {}

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    return this._accountService
      .isRegisteredEmail(control.value)
      .then((isResgistered) => {
        return isResgistered ? { registered: isResgistered } : null;
      })
      .catch(() => null);
  }
}
