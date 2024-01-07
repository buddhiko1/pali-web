import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { RoleEnum } from '../values/cms.values';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private _storageService: StorageService) {}

  get isAdmin(): boolean {
    return this._storageService.isLoggedIn
      ? this._storageService.account.role?.name === RoleEnum.Admin
      : false;
  }

  get isUser(): boolean {
    return this._storageService.isLoggedIn
      ? this._storageService.account.role?.name === RoleEnum.User
      : false;
  }

  get isPublic(): boolean {
    return !this._storageService.isLoggedIn;
  }
}
