import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountService {
  isRegisteredEmail(email: string): Observable<boolean> {
    const isRegistered = email == 'buddhiko@outlook.com';
    return of(isRegistered).pipe(delay(400));
  }
}
