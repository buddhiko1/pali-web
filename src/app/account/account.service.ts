import { Injectable } from '@angular/core';
import { CombinedError } from '@urql/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UrqlService } from '../urql/urql.service';
import { StorageService } from '../core/storage.service';
import {
  AuthLoginDocument,
  AuthLoginMutationVariables,
  AuthLogoutDocument,
  AuthLogoutMutationVariables,
  Auth_Tokens,
  UsersInviteDocument,
  UsersInviteMutationVariables,
} from '../gql/graphql';

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

  invite(inviteArgs: UsersInviteMutationVariables): Promise<void> {
    return new Promise<void>((resolve) => {
      const client = this._urqlService.loginClient;
      client
        .mutation(UsersInviteDocument, inviteArgs)
        .toPromise()
        .then(() => {
          resolve();
        });
    });
  }

  login(loginArgs: AuthLoginMutationVariables): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const client = this._urqlService.loginClient;
      client
        .mutation(AuthLoginDocument, loginArgs)
        .toPromise()
        .then((result) => {
          if (result.data?.auth_login) {
            this._storageService.saveAuthToken(
              result.data?.auth_login as Auth_Tokens
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

  logout(logoutArgs?: AuthLogoutMutationVariables): Promise<void> {
    return new Promise<void>((resolve) => {
      if (logoutArgs) {
        const client = this._urqlService.loginClient;
        client
          .mutation(AuthLogoutDocument, logoutArgs)
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
