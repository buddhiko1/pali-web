import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MeFieldsFragment } from 'src/gql/graphql';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/core/storage.service';
import { NavigationService } from 'src/app/core/navigation.service';
import { AccountService } from '../account.service';
import { UrlEnum } from '../account-routing.module';
import { UploaderComponent } from '../../uploader/uploader.component';
import { FadeInDirective } from '../../core/fade-in.directive';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrl: './me.component.css',
  standalone: true,
  imports: [NgIf, FadeInDirective, UploaderComponent],
})
export class MeComponent {
  showUploader = false;
  avatarFolderId = '';

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

  async initAvatarFolderId(): Promise<void> {
    if (!this.avatarFolderId) {
      this.avatarFolderId = await this._accountService.fetchAvatarFolderId();
    }
  }

  get avatarUrl(): string {
    return this._storageService.me?.avatar
      ? `${environment.fileServer}/${this._storageService.me.avatar.filename_disk}`
      : 'assets/images/deafult_avatar.webp';
  }

  async onAvatarClick(): Promise<void> {
    await this.initAvatarFolderId();
    this.showUploader = true;
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

  async onLogout(): Promise<void> {
    await this._accountService.logout();
    this._navigationService.back();
  }

  onReset(): void {
    this._router.navigate([`../${UrlEnum.ResetRequest}`], {
      relativeTo: this._activeRoute,
    });
  }
}
