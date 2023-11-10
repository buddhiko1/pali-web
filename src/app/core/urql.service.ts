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
    tokenForRefresh: _storageService.tokenForRefresh,
  });
  if (result?.data?.refreshedToken) {
    _storageService.saveAuthToken(result?.data?.refreshedToken);
  } else {
    _storageService.clearAccountData();
  }
}

const _storageService = new StorageService();

const _customAuthExchange = authExchange(async (utils) => {
  return {
    addAuthToOperation(operation) {
      return utils.appendHeaders(operation, {
        Authorization: `Bearer ${_storageService.tokenForAccess}`,
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
  private _systemClient: Client;
  private _authedSystemClient: Client;
  private _dataClient: Client;
  private _authedDataClient: Client;

  constructor() {
    this._systemClient = new Client({
      url: `${environment.cms}/graphql/system`,
      exchanges: [_errorExchange, fetchExchange],
    });
    this._authedSystemClient = new Client({
      url: `${environment.cms}/graphql/system`,
      exchanges: [_errorExchange, _customAuthExchange, fetchExchange],
    });
    this._dataClient = new Client({
      url: `${environment.cms}/graphql`,
      exchanges: [_errorExchange, cacheExchange, fetchExchange],
    });
    this._authedDataClient = new Client({
      url: `${environment.cms}/graphql`,
      exchanges: [
        _errorExchange,
        cacheExchange,
        _customAuthExchange,
        fetchExchange,
      ],
    });
  }

  get systemClient(): Client {
    return _storageService.isLoggedIn
      ? this._authedSystemClient
      : this._systemClient;
  }

  get dataClient(): Client {
    return _storageService.isLoggedIn
      ? this._authedDataClient
      : this._dataClient;
  }
}
