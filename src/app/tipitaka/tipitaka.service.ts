import { Injectable } from '@angular/core';

import { DataUrqlService } from '../urql/urql.service';
import {
  Tipitaka,
  TipitakaDocument,
  Cites,
  CitesDocument,
} from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class TipitakaService {
  constructor(private _urqlService: DataUrqlService) {}

  async fetchTipitaka(): Promise<Tipitaka[]> {
    const result = await this._urqlService.query(TipitakaDocument, {});
    return result.data.tipitaka;
  }

  async fetchCites(): Promise<Cites[]> {
    const result = await this._urqlService.query(CitesDocument, {});
    return result.data.cites;
  }
}
