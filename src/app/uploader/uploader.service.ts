import { Injectable } from '@angular/core';
import { createDirectus, staticToken, rest, uploadFiles } from '@directus/sdk';

import { environment } from 'src/environments/environment';
import { StorageService } from '../core/storage.service';
import { FileFieldsFragment } from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class UploaderService {
  constructor(private _storageService: StorageService) {}

  //TODO implement with graphql api when that is supported
  async upload(formData: FormData): Promise<FileFieldsFragment> {
    const client = createDirectus<FileFieldsFragment>(environment.cms)
      .with(staticToken(this._storageService.tokenForAccess))
      .with(rest());
    return await client.request(uploadFiles(formData));
  }
}
