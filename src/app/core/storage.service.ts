import { Injectable } from '@angular/core';
import { Auth_Tokens } from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _authTokenKey = 'authToken';
  private _refreshTokenKey = 'refreshToken';

  constructor() {}

  get accessToken() {
    return localStorage.getItem(this._authTokenKey);
  }

  get refreshToken() {
    return localStorage.getItem(this._refreshTokenKey);
  }

  saveAuthToken(authToken: Auth_Tokens) {
    localStorage.setItem(this._authTokenKey, authToken.access_token ?? '');
    localStorage.setItem(this._refreshTokenKey, authToken.refresh_token ?? '');
  }

  clear() {
    localStorage.clear();
  }
}
