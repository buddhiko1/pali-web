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
  userProfile!: UserProfileFragment;

  constructor(
    private _route: ActivatedRoute,
    private _usersService: UsersService,
    private _storageService: StorageService,
  ) {}

  ngOnInit(): void {
    const userId = this._route.snapshot.paramMap.get('id')!;
    this._usersService
      .fetchUserById({
        id: userId,
      })
      .then((user) => {
        this.user = user;
      });
    this._usersService.fetchUserProfile({ userId: userId }).then((profile) => {
      this.userProfile = profile;
    });
  }

  get isMyself(): boolean {
    return this.user?.id === this._storageService.account?.id;
  }
}
