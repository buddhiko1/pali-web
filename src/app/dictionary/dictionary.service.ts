import { Injectable } from '@angular/core';
import { Client } from '@urql/core';

import {
  DictionariesDocument,
  Dictionaries,
  DictIntroductionDocument,
  Dict_Introduction,
} from 'src/gql/graphql';
import { validateAndExtractResult } from '../core/utilities.gql';
import { UrqlService } from '../core/urql.service';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private _dataClient: Client;
  constructor(private _urqlService: UrqlService) {
    this._dataClient = this._urqlService.dataClient;
  }

  async fetchIntroduction(): Promise<Dict_Introduction> {
    const result = await this._dataClient.query(DictIntroductionDocument, {});
    const data = validateAndExtractResult(result);
    return data.dict_introduction;
  }

  async fetchDictionaries(): Promise<Dictionaries[]> {
    const result = await this._dataClient.query(DictionariesDocument, {});
    const data = validateAndExtractResult(result);
    return data.dictionaries;
  }
}
