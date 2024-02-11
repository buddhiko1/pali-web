import { Component, Input, OnInit } from '@angular/core';

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
export class UserAvatarComponent implements OnInit {
  @Input() isButtonStyle = true;
  @Input() size = '4rem';
  @Input({ required: true }) avatarId?: string | null;

  avatar: AvatarFragment | null = null;

  constructor(
    private _usersService: UsersService,
    private _urlService: UrlService,
  ) {}

  ngOnInit(): void {
    this.fetchUserAvatar();
  }

  get avatarUrl(): string {
    return this.avatar
      ? this._urlService.fileUrlFor(this.avatar.filename_disk)
      : 'assets/images/avatar.webp';
  }

  async fetchUserAvatar(): Promise<void> {
    if (this.avatarId) {
      this.avatar = await this._usersService.fetchUserAvatar({
        avatarId: this.avatarId,
      });
    } else {
      this.avatar = null;
    }
  }
}
