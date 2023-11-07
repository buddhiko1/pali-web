import { Injectable } from '@angular/core';
import { Client } from '@urql/core';

import {
  Tipitaka,
  TipitakaDocument,
  Cites,
  CitesDocument,
} from 'src/gql/graphql';
import { validateAndExtractResult } from '../core/utilities.gql';
import { UrqlService } from '../core/urql.service';

@Injectable({
  providedIn: 'root',
})
export class TipitakaService {
  private _dataClient: Client;
  constructor(private _urqlService: UrqlService) {
    this._dataClient = this._urqlService.dataClient;
  }

  async fetchTipitaka(): Promise<Tipitaka[]> {
    const result = await this._dataClient.query(TipitakaDocument, {});
    const data = validateAndExtractResult(result);
    return data.tipitaka;
  }

  async fetchCites(): Promise<Cites[]> {
    const result = await this._dataClient.query(CitesDocument, {});
    const data = validateAndExtractResult(result);
    return data.cites;
  }
}
