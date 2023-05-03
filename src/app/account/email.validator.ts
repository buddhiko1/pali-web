import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class UnregisteredEmailValidator implements AsyncValidator {
  constructor(private _accountService: AccountService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this._accountService.isRegisteredEmail(control.value).pipe(
      map((isResigtered) => (isResigtered ? null : { unregistered: true })),
      catchError(() => of(null))
    );
  }
}

@Injectable({ providedIn: 'root' })
export class DuplicateEmailValidator implements AsyncValidator {
  constructor(private _accountService: AccountService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this._accountService.isRegisteredEmail(control.value).pipe(
      map((isResigtered) => (isResigtered ? { duplicate: true } : null)),
      catchError(() => of(null))
    );
  }
}
