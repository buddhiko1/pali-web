import { Injectable } from '@angular/core';
import { Client, cacheExchange, fetchExchange, mapExchange } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';
import { environment } from 'src/environments/environment';
import { StorageService } from '../core/storage.service';

import {
  AuthRefreshDocument,
  AuthRefreshMutationVariables,
} from '../gql/graphql';

@Injectable({ providedIn: 'root' })
export class UrqlService {
  loginClient: Client;
  dataClient: Client;
  systemClient: Client;

  constructor(private _storageService: StorageService) {
    this.loginClient = new Client({
      url: `${environment.host}/graphql/system`,
      exchanges: [fetchExchange],
    });
    this.dataClient = new Client({
      url: `${environment.host}/graphql`,
      exchanges: [
        cacheExchange,
        mapExchange({
          onError(error, operation) {
            console.log(
              `The operation ${operation.key} has errored with:`,
              error
            );
          },
        }),
        fetchExchange,
      ],
    });
    const saveAuthToken = this._storageService.saveAuthToken;
    const accessToken = this._storageService.accessToken;
    const refreshToken = this._storageService.refreshToken;
    const clearStorage = this._storageService.clear;
    this.systemClient = new Client({
      url: `${environment.host}/graphql/system`,
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
                clearStorage();
                return;
              }
              const refreshArgs: AuthRefreshMutationVariables = {
                refreshToken,
              };
              const result = await utils.mutate(
                AuthRefreshDocument,
                refreshArgs
              );
              if (result.data?.auth_refresh) {
                saveAuthToken(result.data.auth_refresh);
              } else {
                clearStorage();
              }
            },
          };
        }),
        fetchExchange,
      ],
    });
  }
}
