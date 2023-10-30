import { Injectable } from '@angular/core';

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
  constructor(private _urqlService: UrqlService) {}

  async fetchIntroduction(): Promise<Dict_Introduction> {
    const client = this._urqlService.dataClient;
    const result = await client.query(DictIntroductionDocument, {});
    const data = validateAndExtractResult(result);
    return data.dict_introduction;
  }

  async fetchDictionaries(): Promise<Dictionaries[]> {
    const client = this._urqlService.dataClient;
    const result = await client.query(DictionariesDocument, {});
    const data = validateAndExtractResult(result);

    return data.dictionaries;
  }
}
