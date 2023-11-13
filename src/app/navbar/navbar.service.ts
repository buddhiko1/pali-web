import { Injectable } from '@angular/core';

import { DataUrqlService } from '../urql/urql.service';
import { RoutesDocument, RoutesFragment } from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  constructor(private _urqlService: DataUrqlService) {}

  async fetchRoutes(): Promise<RoutesFragment[]> {
    const result = await this._urqlService.query(RoutesDocument, {});
    return result.data.routes;
  }
}
