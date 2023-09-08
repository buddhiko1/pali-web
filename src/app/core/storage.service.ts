import { Injectable } from '@angular/core';
import { Auth_Tokens, Directus_Users } from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _authTokenKey = 'authToken';
  private _refreshTokenKey = 'refreshToken';
  private _meKey = 'me';

  constructor() {}

  saveAuthToken(authToken: Auth_Tokens) {
    localStorage.setItem(this._authTokenKey, authToken.access_token ?? '');
    localStorage.setItem(this._refreshTokenKey, authToken.refresh_token ?? '');
  }

  get accessToken(): string {
    return localStorage.getItem(this._authTokenKey) ?? '';
  }

  get refreshToken(): string {
    return localStorage.getItem(this._refreshTokenKey) ?? '';
  }

  saveMe(me: any) {
    if (me) {
      localStorage.setItem(this._meKey, JSON.stringify(me));
    }
  }

  get me(): Directus_Users | null {
    const data = localStorage.getItem(this._meKey);
    return data ? JSON.parse(data) : null;
  }

  clear() {
    localStorage.clear();
  }
}
