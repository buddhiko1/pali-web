import { Injectable } from '@angular/core';

import { FolderEnum } from './shared/values/cms.values';
import { SystemUrqlService } from './urql/urql.service';
import { FolderIdDocument } from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private _urqlService: SystemUrqlService) {}

  async fetchFolderIdOfUserAvatar(): Promise<string> {
    const result = await this._urqlService.query(FolderIdDocument, {
      name: FolderEnum.Avatar,
    });
    return result.data.folders[0].id;
  }

  async fetchFolderIdOfWysiwyg(): Promise<string> {
    const result = await this._urqlService.query(FolderIdDocument, {
      name: FolderEnum.Wysiwyg,
    });
    return result.data.folders[0].id;
  }
}
