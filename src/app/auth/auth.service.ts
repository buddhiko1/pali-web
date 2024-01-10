import { Injectable } from '@angular/core';
import { Subscription, interval } from 'rxjs';

import { SystemUrqlService } from '../shared/services/urql.service';
import { StorageService } from '../shared/services/storage.service';
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
  private _subscriptionForTokenRefresh!: Subscription;

  constructor(
    private _systemUrqlService: SystemUrqlService,
    private _storageService: StorageService,
  ) {}

  async login(args: LoginMutationVariables): Promise<AuthTokensFragment> {
    const result = await this._systemUrqlService.mutation(LoginDocument, args);
    const authTokens = result.data.authTokens;
    this._subscriptionForTokenRefresh = interval(
      authTokens.expires - 1000 * 60,
    ).subscribe(() => {
      this.refreshToken({
        tokenForRefresh: this._storageService.tokenForRefresh,
      }).then((newTokens) => {
        this._storageService.saveAuthToken(newTokens);
      });
    });
    return authTokens;
  }

  async logout(args: LogoutMutationVariables): Promise<void> {
    this._subscriptionForTokenRefresh.unsubscribe();
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
