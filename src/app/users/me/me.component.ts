import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/shared/services/storage.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UploaderComponent } from 'src/app/uploader/uploader.component';
import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';
import { UsersService } from '../users.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserMeFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrl: './me.component.css',
  standalone: true,
  imports: [FadeInDirective, UploaderComponent],
})
export class MeComponent {
  showUploader = false;
  avatarFolderId = '';

  constructor(
    private _usersService: UsersService,
    private _authService: AuthService,
    private _storageService: StorageService,
    private _navigationService: NavigationService,
  ) {}

  get me(): UserMeFragment | null {
    return this._storageService.me;
  }

  async initAvatarFolderId(): Promise<void> {
    if (!this.avatarFolderId) {
      this.avatarFolderId =
        await this._usersService.fetchFolderIdOfUserAvatar();
    }
  }

  get avatarUrl(): string {
    return this._storageService.me?.avatar
      ? `${environment.fileServer}/${this._storageService.me.avatar.filename_disk}`
      : 'assets/images/default.webp';
  }

  async onAvatarClick(): Promise<void> {
    await this.initAvatarFolderId();
    this.showUploader = true;
  }

  async onAvatarUploaded(newAvatarId: string): Promise<void> {
    this.showUploader = false;
    const oldAavatarId = this.me?.avatar?.id;

    const updatedMe = await this._usersService.updateMe({
      avatar: {
        id: newAvatarId,
      },
    });
    this._storageService.saveMe(updatedMe);

    if (oldAavatarId) {
      await this._usersService.deleteOldUserAvatar({
        avatarId: oldAavatarId,
      });
    }
  }

  async onLogout(): Promise<void> {
    await this._authService.logout();
    this._navigationService.goBack();
  }
}
