import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Directus_Users } from 'src/gql/graphql';
import { StorageService } from 'src/app/core/storage.service';
import { NavigationService } from 'src/app/core/navigation.service';
import { AccountService } from '../account.service';
import { UrlEnum } from '../account-routing.module';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit {
  constructor(
    private _accountService: AccountService,
    private _storageService: StorageService,
    private _navigationService: NavigationService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    console.log('me');
  }
  get me(): Directus_Users | null {
    return this._storageService.me;
  }

  onLogout(): void {
    this._navigationService.back();
    this._accountService.logout();
  }

  onReset(): void {
    this._router.navigate([`../${UrlEnum.ResetRequest}`], {
      relativeTo: this._activeRoute,
    });
  }
}
