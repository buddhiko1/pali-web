import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { RoleEnum } from '../values/cms.values';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private _storageService: StorageService) {}

  get isAdmin(): boolean {
    return this._storageService.me?.role?.name === RoleEnum.Admin;
  }

  get isUser(): boolean {
    return this._storageService.me?.role?.name === RoleEnum.User;
  }

  get isPublic(): boolean {
    return !this.isAdmin && !this.isUser;
  }
}
