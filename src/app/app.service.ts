import { Injectable } from '@angular/core';

import { SystemUrqlService } from './shared/services/urql.service';
import { FolderIdDocument } from 'src/gql/graphql';
import { FolderIdQueryVariables } from 'src/gql/graphql';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private _urqlService: SystemUrqlService) {}

  async fetchFolderIdByName(args: FolderIdQueryVariables): Promise<string> {
    const result = await this._urqlService.query(FolderIdDocument, args);
    return result.data.folders[0].id;
  }
}
