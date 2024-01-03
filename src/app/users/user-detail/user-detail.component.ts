import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';
import { UsersService } from '../users.service';
import { UserAvatarComponent } from '../shared/user-avatar/user-avatar.component';
import { UserFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
  standalone: true,
  imports: [FadeInDirective, UserAvatarComponent],
})
export class UserDetailComponent implements OnInit {
  user!: UserFragment;

  constructor(
    private _route: ActivatedRoute,
    private _usersService: UsersService,
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
  }
}
