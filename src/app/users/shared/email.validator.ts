import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { UsersService } from '../users.service';

@Injectable({ providedIn: 'root' })
export class UnRegisteredEmailValidator implements AsyncValidator {
  constructor(private _usersService: UsersService) {}

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    return this._usersService
      .fetchUserByEmail(control.value)
      .then((user) => {
        return user ? null : { unRegistered: true };
      })
      .catch(() => null);
  }
}

@Injectable({ providedIn: 'root' })
export class RegisteredEmailValidator implements AsyncValidator {
  constructor(private _usersService: UsersService) {}

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    return this._usersService
      .fetchUserByEmail(control.value)
      .then((user) => {
        return user ? { registered: true } : null;
      })
      .catch(() => null);
  }
}
