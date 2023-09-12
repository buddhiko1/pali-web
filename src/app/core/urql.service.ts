import { Injectable } from '@angular/core';
import { Client, cacheExchange, fetchExchange, mapExchange } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';

import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/core/storage.service';

import {
  RefreshTokenDocument,
  RefreshTokenMutationVariables,
} from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class UrqlService {
  authClient: Client;
  publicClient: Client;
  userClient: Client;

  constructor() {
    this.authClient = new Client({
      url: `${environment.host}/graphql/system`,
      exchanges: [
        mapExchange({
          // handle error globally.
          onError(error, operation) {
            //TODO replace with error message
            console.error(
              `The operation ${operation.key} has errored with:`,
              error
            );
          },
        }),
        fetchExchange,
      ],
    });

    this.publicClient = new Client({
      url: `${environment.host}/graphql`,
      exchanges: [
        cacheExchange,
        mapExchange({
          // handle error globally.
          onError(error, operation) {
            //TODO replace with error message
            console.error(
              `The operation ${operation.key} has errored with:`,
              error
            );
          },
        }),
        fetchExchange,
      ],
    });

    const storageService = new StorageService();
    this.userClient = new Client({
      url: `${environment.host}/graphql/system`,
      exchanges: [
        authExchange(async (utils) => {
          return {
            addAuthToOperation(operation) {
              if (!storageService.accessToken) return operation;
              return utils.appendHeaders(operation, {
                Authorization: `Bearer ${storageService.accessToken}`,
              });
            },
            didAuthError(error) {
              return error.graphQLErrors.some(
                (e) => e.extensions?.['code'] === 'FORBIDDEN'
              );
            },
            async refreshAuth() {
              if (!storageService.refreshToken) {
                storageService.clear();
                return;
              }
              const args: RefreshTokenMutationVariables = {
                refreshToken: storageService.refreshToken,
              };
              const result = await utils.mutate(RefreshTokenDocument, args);
              if (result.data?.refresh) {
                storageService.saveAuthToken(result.data.refresh);
              } else {
                storageService.clear();
              }
            },
          };
        }),
        fetchExchange,
      ],
    });
  }
}
