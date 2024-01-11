import { Component, Input } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserAvatarComponent } from 'src/app/users/shared/user-avatar/user-avatar.component';
import { BlogFragment } from 'src/gql/graphql';
import { ChatSvgComponent } from 'src/app/svg/chat/chat.component';
import { BadgeComponent } from 'src/app/ui/badge/badge.component';
import { DeleteSvgComponent } from 'src/app/svg/delete/delete.component';
import { EditSvgComponent } from 'src/app/svg/edit/edit.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    UserAvatarComponent,
    ChatSvgComponent,
    BadgeComponent,
    DeleteSvgComponent,
    EditSvgComponent,
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent {
  @Input()
  blogs: BlogFragment[] = [];

  constructor(private _router: Router) {}
  onAvatarClick(event: Event, userId: string) {
    event.preventDefault();
    this._router.navigate(['../users/detail', userId]);
  }
}
