import { Injectable } from '@angular/core';

import { DataUrqlService } from '../urql/urql.service';
import { ModulesDocument, Modules } from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _urqlService: DataUrqlService) {}
  async fetchModules(): Promise<Modules[]> {
    const result = await this._urqlService.query(ModulesDocument, {});
    return result.data.modules;
  }
}
