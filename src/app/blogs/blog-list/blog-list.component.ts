import { Component, Input } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserAvatarComponent } from 'src/app/users/user-avatar/user-avatar.component';
import { BlogFragment } from 'src/gql/graphql';
import { ChatSvgComponent } from 'src/app/svg/chat/chat.component';
import { BadgeComponent } from 'src/app/ui/badge/badge.component';
import { DeleteSvgComponent } from 'src/app/svg/delete/delete.component';
import { EditSvgComponent } from 'src/app/svg/edit/edit.component';
import { ScreenService } from 'src/app/shared/services/screen.service';
import { OverViewPipe } from './overview.pipe';
import { ActiveDatePipe } from './active-date.pipe';

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
    OverViewPipe,
    ActiveDatePipe,
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent {
  @Input()
  blogs: BlogFragment[] = [];
  @Input()
  showAvatar: boolean = true;

  constructor(
    private _router: Router,
    private _screenService: ScreenService,
  ) {}

  get isTablet(): boolean {
    return this._screenService.isTablet;
  }

  get isPhone(): boolean {
    return this._screenService.isPhone;
  }

  onAvatarClick(event: Event, userId: string) {
    event.preventDefault();
    this._router.navigate(['/users/detail', userId]);
  }

  onBlogClick(blogId: string) {
    this._router.navigate(['/blogs/viewer', blogId]);
  }
}
