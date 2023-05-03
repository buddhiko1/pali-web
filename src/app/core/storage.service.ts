import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _authToken = 'authToken';
  private _refreshToken = 'refreshToken';

  constructor() {}

  getAuthToken() {
    const token = localStorage.getItem(this._authToken);
    const refreshToken = localStorage.getItem(this._refreshToken);
    return { token, refreshToken };
  }

  saveAuthToken(token: string, refreshToken: string) {
    localStorage.setItem(this._authToken, token);
    localStorage.setItem(this._refreshToken, refreshToken);
  }

  clear() {
    localStorage.clear();
  }
}
