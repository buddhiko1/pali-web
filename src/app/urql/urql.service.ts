import { Injectable } from '@angular/core';
import { Client, cacheExchange, fetchExchange } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';
import { StorageService } from '../core/storage.service';
import { RefreshTokenDocument } from '../gql/graphql';

@Injectable({ providedIn: 'root' })
export class UrqlService {
  loginClient: Client;
  dataClient: Client;
  systemClient: Client;

  constructor(private _storageService: StorageService) {
    this.loginClient = new Client({
      url: 'http://localhost:9000/graphql/system',
      exchanges: [fetchExchange],
    });
    this.dataClient = new Client({
      url: 'http://localhost:9000/graphql',
      exchanges: [cacheExchange, fetchExchange],
    });
    const saveAuthToken = this._storageService.saveAuthToken;
    const clearStorage = this._storageService.clear;
    const accessToken = this._storageService.accessToken;
    const refreshToken = this._storageService.refreshToken;
    this.systemClient = new Client({
      url: 'http://localhost:9000/graphql/system',
      exchanges: [
        authExchange(async (utils) => {
          return {
            addAuthToOperation(operation) {
              if (!accessToken) return operation;
              return utils.appendHeaders(operation, {
                Authorization: `Bearer ${accessToken}`,
              });
            },
            didAuthError(error) {
              return error.graphQLErrors.some(
                (e) => e.extensions?.['code'] === 'FORBIDDEN'
              );
            },
            async refreshAuth() {
              if (!refreshToken) {
                // logout();
                return;
              }
              const result = await utils.mutate(RefreshTokenDocument, {
                refreshToken,
              });
              if (result.data?.auth_refresh) {
                saveAuthToken(result.data.auth_refresh);
              } else {
                clearStorage();
                // logout();
              }
            },
          };
        }),
        fetchExchange,
      ],
    });
  }
}
