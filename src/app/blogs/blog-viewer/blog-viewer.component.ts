import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BlogsService } from '../blogs.service';
import { ScreenService } from 'src/app/shared/services/screen.service';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';
import { PenSvgComponent } from 'src/app/svg/pen/pen.component';
import { CommentMarkComponent } from 'src/app/comments/comment-mark/comment-mark.component';
import { IconButtonComponent } from 'src/app/ui/icon-button/icon-button.component';
import { ScrollButtonComponent } from 'src/app/ui/scroll-button/scroll-button.component';
import { UserAvatarComponent } from 'src/app/users/user-avatar/user-avatar.component';
import { PostbarComponent } from 'src/app/postbar/postbar.component';
import { UserProfileComponent } from 'src/app/users/user-profile/user-profile.component';
import { BlogFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-blog-viewer',
  standalone: true,
  imports: [
    CommonModule,
    SafeHtmlPipe,
    PenSvgComponent,
    ScrollButtonComponent,
    IconButtonComponent,
    CommentMarkComponent,
    PostbarComponent,
    UserProfileComponent,
    UserAvatarComponent,
  ],
  templateUrl: './blog-viewer.component.html',
  styleUrl: './blog-viewer.component.css',
})
export class BlogViewerComponent {
  blog!: BlogFragment;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _blogsService: BlogsService,
    private _screenService: ScreenService,
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
  }

  routeToUserDetail(event: Event, userId: string): void {
    event.stopPropagation();
    this._router.navigate(['/users/detail', userId]);
  }

  get isPc(): boolean {
    return this._screenService.isPc;
  }

  // get showEditButton(): boolean {
  //   if (!this._screenService.isPhone) {
  //     if (this._storageService.isLoggedIn) {
  //       return this._storageService.account?.id === this.blog.user_created?.id;
  //     }
  //   }
  //   return false;
  // }

  editBlog(): void {
    this._router.navigate(['/blogs/editor', this.blog.id]);
  }
}
