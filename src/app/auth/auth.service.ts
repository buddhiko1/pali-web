import { Injectable } from '@angular/core';

import { SystemUrqlService } from '../shared/services/urql.service';
import {
  LoginDocument,
  LoginMutationVariables,
  LogoutDocument,
  LogoutMutationVariables,
  RequestPasswordResetDocument,
  RequestPasswordResetMutationVariables,
  ResetPasswordDocument,
  ResetPasswordMutationVariables,
  AuthTokensFragment,
  RefreshTokenDocument,
  RefreshTokenMutationVariables,
} from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _systemUrqlService: SystemUrqlService) {}

  async login(args: LoginMutationVariables): Promise<AuthTokensFragment> {
    const result = await this._systemUrqlService.mutation(LoginDocument, args);
    return result.data.authTokens;
  }

  async logout(args: LogoutMutationVariables): Promise<void> {
    await this._systemUrqlService.mutation(LogoutDocument, args);
  }

  async refreshToken(
    args: RefreshTokenMutationVariables,
  ): Promise<AuthTokensFragment> {
    const result = await this._systemUrqlService.mutation(
      RefreshTokenDocument,
      args,
    );
    return result.data.authTokens;
  }

  async requestPasswordReset(
    args: RequestPasswordResetMutationVariables,
  ): Promise<void> {
    await this._systemUrqlService.mutation(RequestPasswordResetDocument, args);
  }

  async resetPassword(args: ResetPasswordMutationVariables): Promise<void> {
    await this._systemUrqlService.mutation(ResetPasswordDocument, args);
  }
}
