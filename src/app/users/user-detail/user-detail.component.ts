import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ScreenService } from 'src/app/shared/services/screen.service';
import { SettingSvgComponent } from 'src/app/svg/setting/setting.component';
import { IconButtonComponent } from 'src/app/ui/icon-button/icon-button.component';
import { BlogsService } from 'src/app/blogs/blogs.service';
import { BlogStatusNameEnum } from 'src/app/shared/values/cms.values';
import { BlogListComponent } from 'src/app/blogs/blog-list/blog-list.component';
import { UsersService } from '../users.service';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { UserSettingComponent } from '../user-setting/user-setting.component';
import {
  UserFragment,
  UserProfileFragment,
  BlogFragment,
} from 'src/gql/graphql';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
  standalone: true,
  imports: [
    FadeInDirective,
    SettingSvgComponent,
    IconButtonComponent,
    UserSettingComponent,
    UserAvatarComponent,
    BlogListComponent,
  ],
})
export class UserDetailComponent implements OnInit {
  user!: UserFragment;
  profile!: UserProfileFragment;
  userId: string = '';
  userBlogs: BlogFragment[] = [];

  constructor(
    private _screenService: ScreenService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService,
    private _blogsService: BlogsService,
    private _storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.userId = this._activatedRoute.snapshot.paramMap.get('id')!;
    if (this.isMyself) {
      this.user = this._storageService.account;
      this.profile = this._storageService.profile;
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
    this._fetchUserBlogs();
  }

  get isMyself(): boolean {
    return this._storageService.isLoggedIn
      ? this.userId === this._storageService.account?.id
      : false;
  }

  get isPhone(): boolean {
    return this._screenService.isPhone;
  }

  routeToSetting(): void {
    this._router.navigate([`/users/setting`]);
  }

  private async _fetchUserBlogs(): Promise<void> {
    const statusNameList = [BlogStatusNameEnum.Published];
    if (this.isMyself) {
      statusNameList.push(BlogStatusNameEnum.Draft);
    }
    this.userBlogs = await this._blogsService.fetchUserBlogs({
      userId: this.userId,
      statusNameList: statusNameList,
      sortFields: ['-date_created'],
      offset: 0,
      limit: -1,
      returnContent: false,
    });
  }
}
