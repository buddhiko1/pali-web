import { Component, OnDestroy } from '@angular/core';
import { NavbarService } from 'src/app/navbar/navbar.service';
import { Modules } from 'src/gql/graphql';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  modules: Modules[] = [];

  constructor(
    private _navbarService: NavbarService,
    private _homeService: HomeService
  ) {
    this._navbarService.showShadow(false);
    this.fetchModules();
  }

  fetchModules(): void {
    this._homeService.fetchModules().then((modules) => {
      this.modules = modules;
    });
  }

  ngOnDestroy(): void {
    this._navbarService.showShadow(true);
  }
}
