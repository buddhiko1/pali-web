import { Injectable } from '@angular/core';

import { DataUrqlService } from '../urql/urql.service';
import {
  DictionariesDocument,
  Dictionaries,
  DictIntroductionDocument,
  Dict_Introduction,
} from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  constructor(private _urqlService: DataUrqlService) {}

  async fetchIntroduction(): Promise<Dict_Introduction> {
    const result = await this._urqlService.query(DictIntroductionDocument, {});
    return result.data.dict_introduction;
  }

  async fetchDictionaries(): Promise<Dictionaries[]> {
    const result = await this._urqlService.query(DictionariesDocument, {});
    return result.data.dictionaries;
  }
}
