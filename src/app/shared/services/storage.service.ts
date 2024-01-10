import { Injectable } from '@angular/core';
import {
  AuthTokensFragment,
  UserFragment,
  UserProfileFragment,
} from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _keyOfTokens = 'tokens';
  private _keyOfAccount = 'account';
  private _keyOfProfile = 'profile';
  private _keyOfAvatarFolderId = 'avatarFolderId';
  private _keyOfWysiwygFolderId = 'wysiwygFolderId';

  saveAuthTokens(tokens: AuthTokensFragment) {
    const data = {
      ...tokens,
      updateTime: new Date().getTime(),
    };
    localStorage.setItem(this._keyOfTokens, JSON.stringify(data));
  }

  get tokenForAccess(): string {
    const data = localStorage.getItem(this._keyOfTokens)!;
    return JSON.parse(data).access_token;
  }

  get tokenForRefresh(): string {
    const data = localStorage.getItem(this._keyOfTokens)!;
    return JSON.parse(data).refresh_token;
  }

  get upateTimeOfTokens(): number {
    const data = localStorage.getItem(this._keyOfTokens)!;
    return JSON.parse(data).updateTime;
  }

  get expirationOfTokens(): number {
    const data = localStorage.getItem(this._keyOfTokens)!;
    return JSON.parse(data).expires;
  }

  get isLoggedIn(): boolean {
    const data = localStorage.getItem(this._keyOfTokens);
    return data ? true : false;
  }

  get account(): UserFragment {
    const data = localStorage.getItem(this._keyOfAccount)!;
    return JSON.parse(data);
  }

  set account(user: UserFragment) {
    localStorage.setItem(this._keyOfAccount, JSON.stringify(user));
  }

  get profile(): UserProfileFragment {
    const data = localStorage.getItem(this._keyOfProfile)!;
    return JSON.parse(data);
  }

  set profile(profile: UserProfileFragment) {
    localStorage.setItem(this._keyOfProfile, JSON.stringify(profile));
  }

  get avatarFolderId(): string {
    return localStorage.getItem(this._keyOfAvatarFolderId) ?? '';
  }

  set avatarFolderId(value: string) {
    localStorage.setItem(this._keyOfAvatarFolderId, value);
  }

  get wysiwygFolderId(): string {
    return localStorage.getItem(this._keyOfWysiwygFolderId) ?? '';
  }

  set wysiwygFolderId(value: string) {
    localStorage.setItem(this._keyOfWysiwygFolderId, value);
  }

  clearAccountData(): void {
    localStorage.removeItem(this._keyOfTokens);
    localStorage.removeItem(this._keyOfAccount);
    localStorage.removeItem(this._keyOfProfile);
  }
}
