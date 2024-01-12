import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { StorageService } from 'src/app/shared/services/storage.service';
import { UploaderComponent } from 'src/app/uploader/uploader.component';
import { CheckSvgComponent } from 'src/app/svg/check/check.component';
import { SaveSvgComponent } from 'src/app/svg/save/save.component';
import { CameraSvgComponent } from 'src/app/svg/camera/camera.component';
import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';
import { AuthService } from 'src/app/auth/auth.service';
import { ActionIconComponent } from 'src/app/ui/action-icon/action-icon.component';
import { UsersService } from '../users.service';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { UserFragment, UserProfileFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.css',
  standalone: true,
  imports: [
    FormsModule,
    FadeInDirective,
    ActionIconComponent,
    UploaderComponent,
    CheckSvgComponent,
    SaveSvgComponent,
    CameraSvgComponent,
    UserAvatarComponent,
  ],
})
export class UserSettingComponent {
  showUploader = false;
  alais = '';
  isChangingAlais = false;

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

  async saveAlais(): Promise<void> {
    this.isChangingAlais = true;
    const updatedProfile = await this._usersService.updateUserProfile({
      id: this.profile.id,
      data: {
        alais: this.alais,
      },
    });
    this._storageService.profile = updatedProfile;
    this.isChangingAlais = false;
  }

  async onLogout(): Promise<void> {
    await this._authService.logout({
      tokenForRefresh: this._storageService.tokenForRefresh,
    });
    this._storageService.clearAccountData();
    this._router.navigate(['/home']);
  }
}
