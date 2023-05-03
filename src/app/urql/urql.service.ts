import { Injectable } from '@angular/core';
import { gql, Client, cacheExchange, fetchExchange } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';
import { StorageService } from '../core/storage.service';

const REFRESH = gql`
  mutation refresh($refreshToken: String!) {
    auth_refresh(refresh_token: $refreshToken, mode: json) {
      access_token
      refresh_token
    }
  }
`;

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
    this.systemClient = new Client({
      url: 'http://localhost:9000/graphql/system',
      exchanges: [
        authExchange(async (utils) => {
          const { token, refreshToken } = this._storageService.getAuthToken();
          return {
            addAuthToOperation(operation) {
              if (!token) return operation;
              return utils.appendHeaders(operation, {
                Authorization: `Bearer ${token}`,
              });
            },
            didAuthError(error) {
              return error.graphQLErrors.some(
                (e) => e.extensions?.['code'] === 'FORBIDDEN'
              );
            },
            async refreshAuth() {
              const result = await utils.mutate(REFRESH, { refreshToken });
              if (result.data?.access_token) {
                saveAuthToken(
                  result.data.access_token,
                  result.data.refresh_token
                );
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
