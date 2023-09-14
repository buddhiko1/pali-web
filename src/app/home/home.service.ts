import { Injectable } from '@angular/core';

import { UrqlService } from 'src/app/core/urql.service';
import { ModulesDocument, Modules } from 'src/gql/graphql';
import { checkAndExtractResult } from 'src/app/core/utils.gql';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _urqlService: UrqlService) {}

  async fetchModules(): Promise<Modules[]> {
    const client = this._urqlService.dataClient;
    const result = await client.query(ModulesDocument, {});
    const data = checkAndExtractResult(result);
    return data.modules;
  }
}
