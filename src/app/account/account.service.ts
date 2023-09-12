import { Injectable } from '@angular/core';
import { CombinedError } from '@urql/core';

import { Directus_Users } from 'src/gql/graphql';
import { UrqlService } from 'src/app/core/urql.service';
import { StorageService } from 'src/app/core/storage.service';
import { removeNullFields } from 'src/app/core/utils';
import {
  LoginDocument,
  LoginMutationVariables,
  LogoutDocument,
  LogoutMutationVariables,
  Auth_Tokens,
  CreateAccountDocument,
  CreateAccountMutationVariables,
  InitAccountDocument,
  InitAccountMutationVariables,
  RequestResetDocument,
  RequestResetMutationVariables,
  ResetPasswordDocument,
  ResetPasswordMutationVariables,
  UserWithEmailDocument,
  UserWithEmailQueryVariables,
  MeDocument,
} from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    private _urqlService: UrqlService,
    private _storageService: StorageService
  ) {}

  isRegisteredEmail(email: string): Promise<boolean> {
    // The public role must be granted permission to read users' information.
    return new Promise<boolean>((resolve, reject) => {
      const client = this._urqlService.accountClient;
      const args: UserWithEmailQueryVariables = {
        email,
      };
      client
        .query(UserWithEmailDocument, args)
        .toPromise()
        .then((result) => {
          if (result.data?.users) {
            if (result.data.users.length > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            reject();
          }
        });
    });
  }

  createAccount(args: CreateAccountMutationVariables): Promise<void> {
    return new Promise<void>((resolve) => {
      const client = this._urqlService.accountClient;
      client
        .mutation(CreateAccountDocument, args)
        .toPromise()
        .then(() => {
          resolve();
        });
    });
  }

  initAccount(args: InitAccountMutationVariables): Promise<void> {
    return new Promise<void>((resolve) => {
      const client = this._urqlService.accountClient;
      client
        .mutation(InitAccountDocument, args)
        .toPromise()
        .then(() => {
          resolve();
        });
    });
  }

  requestReset(args: RequestResetMutationVariables): Promise<void> {
    return new Promise<void>((resolve) => {
      const client = this._urqlService.accountClient;
      client
        .mutation(RequestResetDocument, args)
        .toPromise()
        .then(() => {
          resolve();
        });
    });
  }

  resetPassword(args: ResetPasswordMutationVariables): Promise<void> {
    return new Promise<void>((resolve) => {
      const client = this._urqlService.accountClient;
      client
        .mutation(ResetPasswordDocument, args)
        .toPromise()
        .then(() => {
          resolve();
        });
    });
  }

  login(args: LoginMutationVariables): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const client = this._urqlService.accountClient;
      client
        .mutation(LoginDocument, args)
        .toPromise()
        .then((result) => {
          if (result.data?.login) {
            this._storageService.saveAuthToken(
              result.data?.login as Auth_Tokens
            );
            this.fetchMe().then(() => {
              resolve();
            });
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
        const client = this._urqlService.accountClient;
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

  fetchMe(): Promise<void> {
    return new Promise<void>((resolve) => {
      const client = this._urqlService.userClient;
      client
        .query(MeDocument, {})
        .toPromise()
        .then((result) => {
          const me = result.data?.users_me;
          const valideMe = removeNullFields(me, 'role', 'avatar');
          this._storageService.saveMe(valideMe);
          console.log(valideMe);
          resolve();
        });
    });
  }
}
