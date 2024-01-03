import { Injectable } from '@angular/core';

import { DataUrqlService } from '../urql/urql.service';
import { Books, BooksDocument, Cites, CitesDocument } from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private _urqlService: DataUrqlService) {}

  async fetchBooks(): Promise<Books[]> {
    const result = await this._urqlService.query(BooksDocument, {});
    return result.data.books;
  }

  async fetchCites(): Promise<Cites[]> {
    const result = await this._urqlService.query(CitesDocument, {});
    return result.data.cites;
  }
}
