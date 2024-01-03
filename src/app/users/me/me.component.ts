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

  constructor(
    private _router: Router,
    private _usersService: UsersService,
    private _authService: AuthService,
    private _storageService: StorageService,
  ) {}

  get me(): UserFragment | null {
    return this._storageService.me;
  }

  get avatarFolderId(): string {
    return this._storageService.avatarFolderId;
  }

  async onAvatarClick(): Promise<void> {
    this.showUploader = true;
  }

  async onAvatarUploaded(newAvatarId: string): Promise<void> {
    this.showUploader = false;
    const oldAavatarId = this.me?.avatar?.id;

    const updatedMe = await this._usersService.updateMe({
      data: {
        avatar: {
          id: newAvatarId,
        },
      },
    });
    this._storageService.saveMe(updatedMe);
    if (oldAavatarId) {
      await this._usersService.deleteOldUserAvatar({
        id: oldAavatarId,
      });
    }
  }

  async onLogout(): Promise<void> {
    await this._authService.logout();
    this._router.navigateByUrl('');
  }
}
