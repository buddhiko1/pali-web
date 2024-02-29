import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/shared/services/storage.service';
import { UsersService } from '../users.service';
import { UserProfileFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  @Input({ required: true }) userId!: string;

  @Input() isLink = false;
  @Input() isSmall = false;
  @Input() isItalic = false;

  profile!: UserProfileFragment;

  constructor(
    private _router: Router,
    private _usersService: UsersService,
    private _storageService: StorageService,
  ) {}

  ngOnInit(): void {
    if (
      this._storageService.isLoggedIn &&
      this.userId === this._storageService.account?.id
    ) {
      this.profile = this._storageService.profile;
    } else {
      this._usersService
        .fetchUserProfile({ userId: this.userId })
        .then((profile) => {
          this.profile = profile;
        });
    }
  }

  routeToDetail(event: Event, userId: string): void {
    event.stopPropagation();
    this._router.navigate(['/users/detail', userId]);
  }
}
