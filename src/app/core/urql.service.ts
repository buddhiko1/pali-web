import { Injectable } from '@angular/core';
import { Exchange } from '@urql/core';
import { Client, cacheExchange, fetchExchange, mapExchange } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';

import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

import {
  RefreshTokenDocument,
  RefreshTokenMutationVariables,
} from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class UrqlService {
  private _errorExchange: Exchange;
  private _customAuthExchange: Exchange;

  constructor(private _storageService: StorageService) {
    this._errorExchange = mapExchange({
      onError(error, operation) {
        console.error(
          `The operation ${operation.key} has errored with:`,
          error,
        );
      },
    });
    const storageService = this._storageService;
    this._customAuthExchange = authExchange(async (utils) => {
      return {
        addAuthToOperation(operation) {
          return utils.appendHeaders(operation, {
            Authorization: `Bearer ${storageService.accessToken}`,
          });
        },
        didAuthError(error) {
          return error.graphQLErrors.some(
            (e) => e.extensions?.['code'] === 'FORBIDDEN',
          );
        },
        async refreshAuth() {
          const args: RefreshTokenMutationVariables = {
            refreshToken: storageService.refreshToken,
          };
          const result = await utils.mutate(RefreshTokenDocument, args);
          if (result.data?.refresh) {
            storageService.saveAuthToken(result.data.refresh);
          } else {
            storageService.clearAccountData();
          }
        },
      };
    });
  }

  get systemClient(): Client {
    // all exchanges should be ordered synchronous first and asynchronous last.
    return new Client({
      url: `${environment.host}/graphql/system`,
      exchanges: [
        this._errorExchange,
        this._storageService.isLoggedIn
          ? this._customAuthExchange
          : mapExchange({}),
        fetchExchange,
      ],
    });
  }

  get dataClient(): Client {
    return new Client({
      url: `${environment.host}/graphql`,
      exchanges: [
        this._errorExchange,
        cacheExchange,
        this._storageService.isLoggedIn
          ? this._customAuthExchange
          : mapExchange({}),
        fetchExchange,
      ],
    });
  }
}
