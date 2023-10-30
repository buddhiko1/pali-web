import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Directus_Users } from 'src/gql/graphql';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/core/storage.service';
import { NavigationService } from 'src/app/core/navigation.service';
import { AccountService } from '../account.service';
import { UrlEnum } from '../account-routing.module';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
})
export class MeComponent {
  constructor(
    private _accountService: AccountService,
    private _storageService: StorageService,
    private _navigationService: NavigationService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
  ) {}

  get me(): Directus_Users | null {
    return this._storageService.me;
  }

  get avatarImage(): string {
    return `${environment.fileServer}/${this.me?.avatar?.filename_disk}`;
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
