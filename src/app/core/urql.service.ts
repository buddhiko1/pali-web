import { Injectable } from '@angular/core';
import { Client, cacheExchange, fetchExchange, mapExchange } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';

import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

import { RefreshTokenDocument } from 'src/gql/graphql';

const _errorExchange = mapExchange({
  onError(error, operation) {
    console.error(operation, error);
  },
});

export async function refreshToken() {
  const client = new Client({
    url: `${environment.cms}/graphql/system`,
    exchanges: [_errorExchange, fetchExchange],
  });
  const result = await client.mutation(RefreshTokenDocument, {
    refreshToken: _storageService.refreshToken,
  });
  if (result?.data?.refresh) {
    _storageService.saveAuthToken(result?.data?.refresh);
  } else {
    _storageService.clearAccountData();
  }
}

const _storageService = new StorageService();

const _customAuthExchange = authExchange(async (utils) => {
  return {
    addAuthToOperation(operation) {
      return utils.appendHeaders(operation, {
        Authorization: `Bearer ${_storageService.accessToken}`,
      });
    },
    didAuthError(error) {
      return error.graphQLErrors.some(
        (e) => e.extensions?.['code'] === 'TOKEN_EXPIRED',
      );
    },
    async refreshAuth() {
      await refreshToken();
    },
  };
});

@Injectable({ providedIn: 'root' })
export class UrqlService {
  get systemClient(): Client {
    return new Client({
      url: `${environment.cms}/graphql/system`,
      exchanges: _storageService.isLoggedIn
        ? [_errorExchange, _customAuthExchange, fetchExchange] // exchanges should be ordered synchronous first and asynchronous last.
        : [_errorExchange, fetchExchange],
    });
  }

  get dataClient(): Client {
    return new Client({
      url: `${environment.cms}/graphql`,
      exchanges: _storageService.isLoggedIn
        ? [_errorExchange, cacheExchange, _customAuthExchange, fetchExchange]
        : [_errorExchange, cacheExchange, fetchExchange],
    });
  }
}
