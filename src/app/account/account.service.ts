import { Injectable } from '@angular/core';
import { CombinedError } from '@urql/core';

import { Directus_Users } from 'src/gql/graphql';
import { UrqlService } from 'src/app/core/urql.service';
import { StorageService } from 'src/app/core/storage.service';
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
  MeQueryVariables,
} from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    private _urqlService: UrqlService,
    private _storageService: StorageService
  ) {}

  isRegisteredEmail(email: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const client = this._urqlService.authClient;
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
      const client = this._urqlService.authClient;
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
      const client = this._urqlService.authClient;
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
      const client = this._urqlService.authClient;
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
      const client = this._urqlService.authClient;
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
      const client = this._urqlService.authClient;
      client
        .mutation(LoginDocument, args)
        .toPromise()
        .then((result) => {
          if (result.data?.login) {
            this._storageService.saveAuthToken(
              result.data?.login as Auth_Tokens
            );
            this.fetchMe();
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
        const client = this._urqlService.authClient;
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
      const client = this._urqlService.systemClient;
      const args: MeQueryVariables = {};
      client
        .query(MeDocument, args)
        .toPromise()
        .then((result) => {
          const me = result.data?.users_me;
          this._storageService.saveMe(me);
          resolve();
        });
    });
  }
}
