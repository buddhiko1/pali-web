import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'src/environments/environment';
import { PersonSvgComponent } from 'src/app/svg/person/person.component';
import { UsersService } from '../../users.service';
import { AvatarFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule, PersonSvgComponent],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.css',
})
export class UserAvatarComponent {
  @Input() size = '4rem';
  @Input()
  set avatarId(value: string | undefined) {
    this._avatarId = value;
    this.fetchUserAvatar();
  }
  @Output() avatarClick = new EventEmitter();
  private _avatarId: string | undefined = undefined;
  avatar: AvatarFragment | null = null;

  constructor(private _usersService: UsersService) {}

  get avatarUrl(): string {
    return this.avatar
      ? `${environment.fileServer}/${this.avatar.filename_disk}`
      : 'assets/images/default_avatar.webp';
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

  async onAvatarClick(): Promise<void> {
    this.avatarClick.emit();
  }
}
