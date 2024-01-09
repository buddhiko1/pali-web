import { Injectable } from '@angular/core';
import {
  Auth_Tokens,
  UserFragment,
  UserProfileFragment,
} from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _keyOfAuthToken = 'authToken';
  private _keyOfRefreshToken = 'refreshToken';
  private _keyOfAccount = 'account';
  private _keyOfProfile = 'profile';
  private _keyOfAvatarFolderId = 'avatarFolderId';
  private _keyOfWysiwygFolderId = 'wysiwygFolderId';

  saveAuthToken(authToken: Auth_Tokens) {
    localStorage.setItem(this._keyOfAuthToken, authToken.access_token ?? '');
    localStorage.setItem(
      this._keyOfRefreshToken,
      authToken.refresh_token ?? '',
    );
  }

  get tokenForAccess(): string {
    return localStorage.getItem(this._keyOfAuthToken) ?? '';
  }

  get tokenForRefresh(): string {
    return localStorage.getItem(this._keyOfRefreshToken) ?? '';
  }

  get isLoggedIn(): boolean {
    return !!this.tokenForAccess;
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
    console.error('clear account data');
    localStorage.removeItem(this._keyOfAuthToken);
    localStorage.removeItem(this._keyOfRefreshToken);
    localStorage.removeItem(this._keyOfAccount);
    localStorage.removeItem(this._keyOfProfile);
  }
}
