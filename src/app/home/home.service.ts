import { Injectable } from '@angular/core';

import { DataUrqlService } from '../shared/services/urql.service';
import { HomePageModulesDocument, Modules } from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _dataUrqlService: DataUrqlService) {}
  async fetchModules(): Promise<Modules[]> {
    const result = await this._dataUrqlService.query(
      HomePageModulesDocument,
      {},
    );
    return result.data.modules;
  }
}
