import { Injectable } from '@angular/core';
import { Client } from '@urql/core';

import { UrqlService } from 'src/app/core/urql.service';
import { ModulesDocument, Modules } from 'src/gql/graphql';
import { validateAndExtractResult } from 'src/app/core/utilities.gql';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _dataClient: Client;
  constructor(private _urqlService: UrqlService) {
    this._dataClient = this._urqlService.dataClient;
  }

  async fetchModules(): Promise<Modules[]> {
    const result = await this._dataClient.query(ModulesDocument, {});
    const data = validateAndExtractResult(result);
    return data.modules;
  }
}
