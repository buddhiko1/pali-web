import { Injectable } from '@angular/core';

import { DataUrqlService } from '../urql/urql.service';
import {
  Dictionaries,
  DictionariesDocument,
  Dict_Introduction,
  DictIntroductionDocument,
} from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class DictionariesService {
  constructor(private _dataUrqlService: DataUrqlService) {}

  async fetchIntroduction(): Promise<Dict_Introduction> {
    const result = await this._dataUrqlService.query(
      DictIntroductionDocument,
      {},
    );
    return result.data.dict_introduction;
  }

  async fetchDictionaries(): Promise<Dictionaries[]> {
    const result = await this._dataUrqlService.query(DictionariesDocument, {});
    return result.data.dictionaries;
  }
}
