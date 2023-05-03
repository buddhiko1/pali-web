import { Injectable } from '@angular/core';
import { gql } from '@urql/core';
import { print } from 'graphql';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UrqlService } from '../urql/urql.service';
import { StorageService } from '../core/storage.service';

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    auth_login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;

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

  async login(email: string, password: string) {
    const client = this._urqlService.loginClient;
    console.log(print(LOGIN));
    const result = await client.mutation(LOGIN, {
      email,
      password,
    });
    this._storageService.saveAuthToken(
      result.data.auth_login.access_token,
      result.data.auth_login.refresh_token
    );
    console.log(result);
  }

  get isLoginned(): boolean {
    return !!this._storageService.getAuthToken();
  }
}
