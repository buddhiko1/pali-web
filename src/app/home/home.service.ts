import { Injectable } from '@angular/core';

import { UrqlService } from 'src/app/core/urql.service';
import { ModulesDocument, Modules } from 'src/gql/graphql';
import { validateAndExtractResult } from 'src/app/core/utilities.gql';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _urqlService: UrqlService) {}

  async fetchModules(): Promise<Modules[]> {
    const client = this._urqlService.dataClient;
    const result = await client.query(ModulesDocument, {});
    const data = validateAndExtractResult(result);
    return data.modules;
  }
}
