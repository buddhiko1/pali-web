import { Injectable } from '@angular/core';
import { Client, fetchExchange, Exchange } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';

import { environment } from 'src/environments/environment';
import { StorageService } from '../core/storage.service';
import { RefreshTokenDocument } from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class UrqlExchange {
  authExchange: Exchange;
  constructor(private _storageService: StorageService) {
    const refreshTokenFn = this._refreshToken;
    const storageService = this._storageService;
    this.authExchange = authExchange(async (utils) => {
      return {
        addAuthToOperation(operation) {
          return utils.appendHeaders(operation, {
            Authorization: `Bearer ${storageService.tokenForAccess}`,
          });
        },
        didAuthError(error) {
          return error.graphQLErrors.some(
            (e) => e.extensions?.['code'] === 'TOKEN_EXPIRED',
          );
        },
        async refreshAuth() {
          await refreshTokenFn();
        },
      };
    });
  }

  private async _refreshToken(): Promise<void> {
    const client = new Client({
      url: `${environment.cms}/graphql/system`,
      exchanges: [fetchExchange],
    });
    const result = await client.mutation(RefreshTokenDocument, {
      tokenForRefresh: this._storageService.tokenForRefresh,
    });
    if (result.data?.refreshedToken) {
      this._storageService.saveAuthToken(result.data?.refreshedToken);
    } else {
      this._storageService.clearAccountData();
    }
  }
}
