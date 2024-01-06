import { Injectable } from '@angular/core';
import { Auth_Tokens, UserFragment } from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _keyOfAuthToken = 'authToken';
  private _keyOfRefreshToken = 'refreshToken';
  private _keyOfAccount = 'account';
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

  saveAccount(user: UserFragment): void {
    localStorage.setItem(this._keyOfAccount, JSON.stringify(user));
  }

  get account(): UserFragment | null {
    const data = localStorage.getItem(this._keyOfAccount);
    return data ? JSON.parse(data) : null;
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

  clearLoginedUserData() {
    localStorage.removeItem(this._keyOfAuthToken);
    localStorage.removeItem(this._keyOfRefreshToken);
    localStorage.removeItem(this._keyOfAccount);
  }
}
