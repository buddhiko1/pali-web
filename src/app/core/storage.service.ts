import { Injectable } from '@angular/core';
import { Auth_Tokens } from '../gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _authToken = 'authToken';
  private _refreshToken = 'refreshToken';

  constructor() {}

  get accessToken() {
    return localStorage.getItem(this._authToken);
  }

  get refreshToken() {
    return localStorage.getItem(this._refreshToken);
  }

  saveAuthToken(authToken: Auth_Tokens) {
    localStorage.setItem(this._authToken, authToken.access_token ?? '');
    localStorage.setItem(this._refreshToken, authToken.refresh_token ?? '');
  }

  clear() {
    localStorage.clear();
  }
}
