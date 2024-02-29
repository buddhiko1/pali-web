import { Component, Input, OnInit } from '@angular/core';

import { UsersService } from '../users.service';
import { UserProfileFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  @Input({ required: true }) userId!: string;

  profile!: UserProfileFragment;

  constructor(private _usersService: UsersService) {}

  ngOnInit(): void {
    this._usersService
      .fetchUserProfile({ userId: this.userId })
      .then((profile) => {
        this.profile = profile;
      });
  }
}
