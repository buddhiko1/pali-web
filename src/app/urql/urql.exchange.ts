import { Injectable } from '@angular/core';
import { Exchange, Operation } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';

import { StorageService } from '../shared/services/storage.service';
import { RefreshTokenDocument } from 'src/gql/graphql';

// can't be defined through construct injector.
const storageService = new StorageService();

@Injectable({ providedIn: 'root' })
export class UrqlExchange {
  authExchange: Exchange;
  constructor() {
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
        // willAuthError(_operation) {
        // TODO check if the token is expired.
        // return false;
        // },
        async refreshAuth(): Promise<void> {
          const result = await utils.mutate(RefreshTokenDocument, {
            tokenForRefresh: storageService.tokenForRefresh,
          });
          if (result.data?.authTokens) {
            console.error('refresh token successful:', result.data);
            storageService.saveAuthToken(result.data?.authTokens);
          } else {
            console.error('refresh token failed:', result);
            storageService.clearAccountData();
          }
        },
      };
    });
  }
}
