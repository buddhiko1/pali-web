import { Injectable } from '@angular/core';

import { StorageService } from 'src/app/core/storage.service';
import { RoleEnum } from './value.cms';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private _storageService: StorageService) {}

  get isAdmin(): boolean {
    return this._storageService.me?.role?.name === RoleEnum.Admin;
  }

  get isUser(): boolean {
    return (
      this._storageService.me?.role?.name === RoleEnum.User || this.isAdmin
    );
  }

  get isPublic(): boolean {
    return !this.isAdmin && !this.isUser;
  }
}
