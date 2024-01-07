import { Injectable } from '@angular/core';

import { StorageService } from '../shared/services/storage.service';
import { SystemUrqlService } from '../urql/urql.service';
import {
  LoginDocument,
  LoginMutationVariables,
  LogoutDocument,
  RequestPasswordResetDocument,
  RequestPasswordResetMutationVariables,
  ResetPasswordDocument,
  ResetPasswordMutationVariables,
} from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private _storageService: StorageService,
    private _systemUrqlService: SystemUrqlService,
  ) {}

  async requestPasswordReset(
    args: RequestPasswordResetMutationVariables,
  ): Promise<void> {
    await this._systemUrqlService.mutation(RequestPasswordResetDocument, args);
  }

  async resetPassword(args: ResetPasswordMutationVariables): Promise<void> {
    await this._systemUrqlService.mutation(ResetPasswordDocument, args);
  }

  async login(args: LoginMutationVariables): Promise<void> {
    const result = await this._systemUrqlService.mutation(LoginDocument, args);
    this._storageService.saveAuthToken(result.data.authToken);
  }

  async logout(): Promise<void> {
    await this._systemUrqlService.mutation(LogoutDocument, {
      tokenForRefresh: this._storageService.tokenForRefresh,
    });
    this._storageService.clearLoginedUserData();
  }
}
