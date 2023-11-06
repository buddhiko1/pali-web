import { Injectable } from '@angular/core';
import { createDirectus, staticToken, rest, uploadFiles } from '@directus/sdk';

import { StorageService } from 'src/app/core/storage.service';
import { refreshToken } from 'src/app/core/urql.service';
import { FileFieldsFragment } from 'src/gql/graphql';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UploaderService {
  constructor(private _storageService: StorageService) {}

  async upload(formData: FormData): Promise<FileFieldsFragment> {
    await refreshToken();
    const client = createDirectus<FileFieldsFragment>(environment.cms)
      .with(staticToken(this._storageService.accessToken))
      .with(rest());
    return await client.request(uploadFiles(formData));
  }
}