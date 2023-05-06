import { Injectable } from '@angular/core';
import { CombinedError } from '@urql/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { UrqlService } from 'src/app/core/urql.service';
import { StorageService } from 'src/app/core/storage.service';
import {
  LoginDocument,
  LoginMutationVariables,
  LogoutDocument,
  LogoutMutationVariables,
  Auth_Tokens,
  SignUpDocument,
  SignUpMutationVariables,
  AccountInitDocument,
  AccountInitMutationVariables,
} from 'src/gql/graphql';

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

  get isLoginned(): boolean {
    return !!this._storageService.accessToken;
  }

  signUp(args: SignUpMutationVariables): Promise<void> {
    return new Promise<void>((resolve) => {
      const client = this._urqlService.loginClient;
      client
        .mutation(SignUpDocument, args)
        .toPromise()
        .then(() => {
          resolve();
        });
    });
  }

  InitAccount(args: AccountInitMutationVariables): Promise<void> {
    return new Promise<void>((resolve) => {
      const client = this._urqlService.loginClient;
      client
        .mutation(AccountInitDocument, args)
        .toPromise()
        .then(() => {
          resolve();
        });
    });
  }

  login(args: LoginMutationVariables): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const client = this._urqlService.loginClient;
      client
        .mutation(LoginDocument, args)
        .toPromise()
        .then((result) => {
          if (result.data?.login) {
            console.log(result);
            this._storageService.saveAuthToken(
              result.data?.login as Auth_Tokens
            );
            resolve();
          } else {
            const error = result.error as CombinedError;
            const errorMessage =
              error.networkError?.message ?? error.graphQLErrors[0].message;
            reject(Error(errorMessage));
          }
        });
    });
  }

  logout(args?: LogoutMutationVariables): Promise<void> {
    return new Promise<void>((resolve) => {
      if (args) {
        const client = this._urqlService.loginClient;
        client
          .mutation(LogoutDocument, args)
          .toPromise()
          .then(() => {
            this._storageService.clear();
            resolve();
          });
      } else {
        this._storageService.clear();
      }
    });
  }
}
