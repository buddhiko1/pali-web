import { Injectable } from '@angular/core';
import { Client, cacheExchange, fetchExchange, mapExchange } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';

import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/core/storage.service';

import { RefreshDocument, RefreshMutationVariables } from 'src/gql/graphql';

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
              const args: RefreshMutationVariables = {
                refreshToken,
              };
              const result = await utils.mutate(RefreshDocument, args);
              if (result.data?.refresh) {
                saveAuthToken(result.data.refresh);
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
