import { Component, Input } from '@angular/core';

import { UrlService } from 'src/app/shared/services/url.service';
import { UsersService } from '../users.service';
import { AvatarFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.css',
})
export class UserAvatarComponent {
  @Input() isButtonStyle = true;
  @Input() size = '4rem';
  @Input()
  set avatarId(value: string | undefined) {
    this._avatarId = value;
    this.fetchUserAvatar();
  }
  private _avatarId: string | undefined = undefined;
  avatar: AvatarFragment | null = null;

  constructor(
    private _usersService: UsersService,
    private _urlService: UrlService,
  ) {}

  get avatarUrl(): string {
    return this.avatar
      ? this._urlService.fileUrlFor(this.avatar.filename_disk)
      : 'assets/images/avatar.webp';
  }

  async fetchUserAvatar(): Promise<void> {
    if (this._avatarId) {
      this.avatar = await this._usersService.fetchUserAvatar({
        avatarId: this._avatarId,
      });
    } else {
      this.avatar = null;
    }
  }
}
