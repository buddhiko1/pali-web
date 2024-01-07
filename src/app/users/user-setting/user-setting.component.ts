import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { StorageService } from 'src/app/shared/services/storage.service';
import { UploaderComponent } from 'src/app/uploader/uploader.component';
import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from '../users.service';
import { UserAvatarComponent } from '../shared/user-avatar/user-avatar.component';
import { UserFragment, UserProfileFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.css',
  standalone: true,
  imports: [
    FormsModule,
    FadeInDirective,
    UploaderComponent,
    UserAvatarComponent,
  ],
})
export class UserSettingComponent {
  showUploader = false;
  alais = '';

  constructor(
    private _router: Router,
    private _usersService: UsersService,
    private _authService: AuthService,
    private _storageService: StorageService,
  ) {
    this.alais = this.profile!.alais;
  }

  get account(): UserFragment {
    return this._storageService.account;
  }

  get profile(): UserProfileFragment {
    return this._storageService.profile;
  }

  get avatarFolderId(): string {
    return this._storageService.avatarFolderId;
  }

  async onAvatarClick(): Promise<void> {
    this.showUploader = true;
  }

  async onAvatarUploaded(newAvatarId: string): Promise<void> {
    this.showUploader = false;
    const oldAavatarId = this.account.avatar?.id;

    const updatedMe = await this._usersService.updateAccount({
      data: {
        avatar: {
          id: newAvatarId,
        },
      },
    });
    this._storageService.account = updatedMe;
    if (oldAavatarId) {
      await this._usersService.deleteOldUserAvatar({
        id: oldAavatarId,
      });
    }
  }

  async onLogout(): Promise<void> {
    await this._authService.logout();
    this._router.navigate(['/home']);
  }
}
