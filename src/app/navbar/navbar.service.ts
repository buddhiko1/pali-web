import { Injectable } from '@angular/core';
import { Client } from '@urql/core';

import { UrqlService } from 'src/app/core/urql.service';
import { validateAndExtractResult } from 'src/app/core/utilities.gql';
import { RoutesDocument, RoutesFragment } from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _dataClient: Client;
  constructor(private _urqlService: UrqlService) {
    this._dataClient = this._urqlService.dataClient;
  }

  async fetchRoutes(): Promise<RoutesFragment[]> {
    const result = await this._dataClient.query(RoutesDocument, {});
    const data = validateAndExtractResult(result);
    return data.modules;
  }
}
