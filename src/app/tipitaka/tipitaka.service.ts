import { Injectable } from '@angular/core';

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
  constructor(private _urqlService: UrqlService) {}

  async fetchTipitaka(): Promise<Tipitaka[]> {
    const client = this._urqlService.dataClient;
    const result = await client.query(TipitakaDocument, {});
    const data = validateAndExtractResult(result);
    return data.tipitaka;
  }

  async fetchCites(): Promise<Cites[]> {
    const client = this._urqlService.dataClient;
    const result = await client.query(CitesDocument, {});
    const data = validateAndExtractResult(result);
    return data.cites;
  }
}
