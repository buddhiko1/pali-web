import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BlogsService } from '../blogs.service';
import { UsersService } from 'src/app/users/users.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ScreenService } from 'src/app/shared/services/screen.service';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';
import { PenSvgComponent } from 'src/app/svg/pen/pen.component';
import { IconButtonComponent } from 'src/app/ui/icon-button/icon-button.component';
import { UserAvatarComponent } from 'src/app/users/user-avatar/user-avatar.component';
import { BlogFragment, UserProfileFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-blog-viewer',
  standalone: true,
  imports: [
    CommonModule,
    SafeHtmlPipe,
    PenSvgComponent,
    IconButtonComponent,
    UserAvatarComponent,
  ],
  templateUrl: './blog-viewer.component.html',
  styleUrl: './blog-viewer.component.css',
})
export class BlogViewerComponent {
  blog!: BlogFragment;
  authorProfile!: UserProfileFragment;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _blogsService: BlogsService,
    private _usersService: UsersService,
    private _screenService: ScreenService,
    private _storageService: StorageService,
  ) {
    this.fetchData();
  }

  get readTime(): string {
    if (this.blog) {
      const wordsPerMinute = 200;
      const wordCount = this.blog.content!.split(' ').length;
      const readTime = Math.ceil(wordCount / wordsPerMinute);
      return `${readTime} min read`;
    }
    return '';
  }

  async fetchData(): Promise<void> {
    const blogId = this._activatedRoute.snapshot.paramMap.get('id')!;
    this.blog = await this._blogsService.fetchBlogById({
      id: blogId,
      returnContent: true,
    });
    const authorId = this.blog.user_created!.id;
    this.authorProfile = await this._usersService.fetchUserProfile({
      userId: authorId,
    });
  }

  routeToUserDetail(event: Event, userId: string): void {
    event.stopPropagation();
    this._router.navigate(['/users/detail', userId]);
  }

  get showEditButton(): boolean {
    return (
      !this._screenService.isPhone &&
      this._storageService.account.id === this.blog.user_created?.id
    );
  }

  editBlog(): void {
    this._router.navigate(['/blogs/editor', this.blog.id]);
  }
}
