import { Injectable } from '@angular/core';

import { DataUrqlService } from '../shared/services/urql.service';
import { Books, BooksDocument, Cites, CitesDocument } from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private _dataUrqlService: DataUrqlService) {}

  async fetchBooks(): Promise<Books[]> {
    const result = await this._dataUrqlService.query(BooksDocument, {});
    return result.data.books;
  }

  async fetchCites(): Promise<Cites[]> {
    const result = await this._dataUrqlService.query(CitesDocument, {});
    return result.data.cites;
  }
}
