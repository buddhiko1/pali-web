import { Injectable } from '@angular/core';

import { UrqlService } from 'src/app/core/urql.service';
import {
  DictionariesDocument,
  Dictionaries,
  DictIntroductionDocument,
  Dict_Introduction,
} from 'src/gql/graphql';
import { checkAndExtractResult } from 'src/app/core/utilities.gql';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  constructor(private _urqlService: UrqlService) {}

  async fetchIntroduction(): Promise<Dict_Introduction> {
    const client = this._urqlService.dataClient;
    const result = await client.query(DictIntroductionDocument, {});
    const data = checkAndExtractResult(result);
    return data.dict_introduction;
  }

  async fetchDictionaries(): Promise<Dictionaries[]> {
    const client = this._urqlService.dataClient;
    const result = await client.query(DictionariesDocument, {});
    const data = checkAndExtractResult(result);
    return data.dictionaries;
  }
}
