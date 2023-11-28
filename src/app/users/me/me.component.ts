import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/shared/services/storage.service';
import { UploaderComponent } from 'src/app/uploader/uploader.component';
import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';
import { AuthService } from 'src/app/auth/auth.service';
import { UserFragment } from 'src/gql/graphql';
import { UsersService } from '../users.service';
import { UserAvatarComponent } from '../shared/user-avatar/user-avatar.component';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrl: './me.component.css',
  standalone: true,
  imports: [FadeInDirective, UploaderComponent, UserAvatarComponent],
})
export class MeComponent {
  showUploader = false;
  avatarFolderId = '';

  constructor(
    private _router: Router,
    private _usersService: UsersService,
    private _authService: AuthService,
    private _storageService: StorageService,
  ) {}

  get me(): UserFragment | null {
    return this._storageService.me;
  }

  async initAvatarFolderId(): Promise<void> {
    if (!this.avatarFolderId) {
      this.avatarFolderId =
        await this._usersService.fetchFolderIdOfUserAvatar();
    }
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
    this._router.navigateByUrl('');
  }
}
