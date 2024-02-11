import { Component, Input } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserAvatarComponent } from 'src/app/users/user-avatar/user-avatar.component';
import { ChatSvgComponent } from 'src/app/svg/chat/chat.component';
import { BadgeComponent } from 'src/app/ui/badge/badge.component';
import { DeleteSvgComponent } from 'src/app/svg/delete/delete.component';
import { EditSvgComponent } from 'src/app/svg/edit/edit.component';
import { DraftSvgComponent } from 'src/app/svg/draft/draft.component';
import { IconButtonComponent } from 'src/app/ui/icon-button/icon-button.component';
import { ConfirmDialogComponent } from 'src/app/ui/confirm-dialog/confirm-dialog.component';
import { ScreenService } from 'src/app/shared/services/screen.service';
import { BlogStatusNameEnum } from 'src/app/shared/values/cms.values';
import { BlogsService } from '../blogs.service';
import { OverViewPipe } from './overview.pipe';
import { ActiveDatePipe } from './active-date.pipe';
import { BlogFragment } from 'src/gql/graphql';

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
    IconButtonComponent,
    DraftSvgComponent,
    ConfirmDialogComponent,
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
  showActions: boolean = true;

  showConfirmDialog = false;
  confirmTitle: string = '';
  confirmPrompt: string = '';
  blogIdForDelete = '';

  constructor(
    private _router: Router,
    private _screenService: ScreenService,
    private _blogsService: BlogsService,
  ) {}

  get isPhone(): boolean {
    return this._screenService.isPhone;
  }

  isDraft(blog: BlogFragment): boolean {
    return blog.status?.name === BlogStatusNameEnum.Draft;
  }

  routeToUserDetail(event: Event, userId: string): void {
    event.stopPropagation();
    this._router.navigate(['/users/detail', userId]);
  }

  viewBlog(blogId: string): void {
    this._router.navigate(['/blogs/viewer', blogId]);
  }

  editBlog(event: Event, blogId: string): void {
    event.stopPropagation();
    this._router.navigate(['/blogs/editor', blogId]);
  }

  deleteBlog(event: Event, blogId: string): void {
    event.stopPropagation();
    this.showConfirmDialog = true;
    this.confirmTitle = 'Delete Blog';
    this.confirmPrompt = 'Are you sure you want to delete this blog?';
    this.blogIdForDelete = blogId;
  }

  cancelDeleteBlog(): void {
    this.showConfirmDialog = false;
  }

  async confirmDeleteBlog(): Promise<void> {
    this.showConfirmDialog = false;
    await this._blogsService.deleteBlog({
      id: this.blogIdForDelete,
    });
    this.blogs = this.blogs.filter((blog) => blog.id !== this.blogIdForDelete);
  }
}
