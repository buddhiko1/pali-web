import { Injectable } from '@angular/core';

import { DataUrqlService } from '../urql/urql.service';
import { NavbarRoutesDocument, RoutesFragment } from 'src/gql/graphql';
import { ThemeEnum } from './navbar.model';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _theme: ThemeEnum = ThemeEnum.DEFAULT;
  constructor(private _urqlService: DataUrqlService) {}

  async fetchRoutes(): Promise<RoutesFragment[]> {
    const result = await this._urqlService.query(NavbarRoutesDocument, {});
    console.log(result.data.routes);
    return result.data.routes;
  }

  get theme(): ThemeEnum {
    return this._theme;
  }
  set theme(theme: ThemeEnum) {
    this._theme = theme;
  }
}
