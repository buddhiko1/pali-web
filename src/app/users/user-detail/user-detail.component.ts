import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsersService } from '../users.service';
import { UserAvatarComponent } from '../shared/user-avatar/user-avatar.component';
import { UserSettingComponent } from '../user-setting/user-setting.component';
import { UserFragment, UserProfileFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
  standalone: true,
  imports: [
    FadeInDirective,
    RouterLink,
    UserSettingComponent,
    UserAvatarComponent,
  ],
})
export class UserDetailComponent implements OnInit {
  user!: UserFragment;
  profile!: UserProfileFragment;
  userId: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _usersService: UsersService,
    private _storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.userId = this._route.snapshot.paramMap.get('id')!;
    if (this.isMyself) {
      this.user = this._storageService.account!;
      this.profile = this._storageService.profile!;
    } else {
      this._usersService
        .fetchUserById({
          id: this.userId,
        })
        .then((user) => {
          this.user = user;
        });
      this._usersService
        .fetchUserProfile({ userId: this.userId })
        .then((profile) => {
          this.profile = profile;
        });
    }
  }

  get isMyself(): boolean {
    return this.userId === this._storageService.account?.id;
  }
}
