import { Injectable } from '@angular/core';
import { Client, fetchExchange, Exchange, Operation } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';

import { environment } from 'src/environments/environment';
import { StorageService } from '../shared/services/storage.service';
import { RefreshTokenDocument } from 'src/gql/graphql';

// can't be defined through construct injector.
const storageService = new StorageService();

@Injectable({ providedIn: 'root' })
export class UrqlExchange {
  authExchange: Exchange;
  constructor() {
    const refreshTokenFn = this._refreshToken;
    this.authExchange = authExchange(async (utils) => {
      return {
        addAuthToOperation(operation): Operation {
          return utils.appendHeaders(operation, {
            Authorization: `Bearer ${storageService.tokenForAccess}`,
          });
        },
        didAuthError(error): boolean {
          return error.graphQLErrors.some(
            (e) => e.extensions?.['code'] === 'TOKEN_EXPIRED',
          );
        },
        async refreshAuth(): Promise<void> {
          await refreshTokenFn();
        },
      };
    });
  }

  private async _refreshToken(): Promise<void> {
    console.error('begin refresh token');
    const client = new Client({
      url: `${environment.cms}/graphql/system`,
      exchanges: [fetchExchange],
    });
    const result = await client.mutation(RefreshTokenDocument, {
      tokenForRefresh: storageService.tokenForRefresh,
    });
    console.error('get refresh token:', result.data);
    if (result.data?.refreshedToken) {
      console.error('refresh token successful!');
      storageService.saveAuthToken(result.data?.refreshedToken);
    } else {
      storageService.clearAccountData();
    }
  }
}
