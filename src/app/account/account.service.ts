import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UrqlService } from '../urql/urql.service';
import { StorageService } from '../core/storage.service';
import { LoginDocument, MutationAuth_LoginArgs } from '../gql/graphql';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    private _urqlService: UrqlService,
    private _storageService: StorageService
  ) {}

  isRegisteredEmail(email: string): Observable<boolean> {
    const isRegistered = email == 'example@outlook.com';
    return of(isRegistered).pipe(delay(400));
  }

  async login(loginArgs: MutationAuth_LoginArgs): Promise<void> {
    const client = this._urqlService.loginClient;
    const result = await client.mutation(LoginDocument, loginArgs);
    // this._storageService.saveAuthToken(
    //   result.data.auth_login,
    // );
    console.log(result);
  }

  get isLoginned(): boolean {
    return !!this._storageService.accessToken;
  }
}
