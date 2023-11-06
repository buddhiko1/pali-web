import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MeFieldsFragment } from 'src/gql/graphql';
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
  showUploader = false;

  constructor(
    private _accountService: AccountService,
    private _storageService: StorageService,
    private _navigationService: NavigationService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
  ) {}

  get me(): MeFieldsFragment | null {
    return this._storageService.me;
  }

  get avatarUrl(): string {
    return this._storageService.me?.avatar
      ? `${environment.fileServer}/${this._storageService.me.avatar.filename_disk}`
      : 'assets/icons/person.svg';
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

  async onAvatarUploaded(newAvatarId: string): Promise<void> {
    this.showUploader = false;
    const oldAavatarId = this.me?.avatar?.id;
    const updatedMe = await this._accountService.updateMe({
      avatar: {
        id: newAvatarId,
      },
    });
    this._storageService.saveMe(updatedMe);
    if (oldAavatarId) {
      await this._accountService.deleteOldAvatar({
        avatarId: oldAavatarId,
      });
    }
  }

  onAvatarClick(): void {
    this.showUploader = true;
  }
}
