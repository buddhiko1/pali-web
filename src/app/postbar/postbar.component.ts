import { Component } from '@angular/core';

import { ChatSvgComponent } from '../svg/chat/chat.component';
import { HeartSvgComponent } from '../svg/heart/heart.component';
import { BookmarkSvgComponent } from '../svg/bookmark/bookmark.component';
import { BookmarkFilledSvgComponent } from '../svg/bookmark-filled/bookmark-filled.component';
import { ShareSvgComponent } from '../svg/share/share.component';
import { IconButtonComponent } from '../ui/icon-button/icon-button.component';
import { CommentsContainerComponent } from '../comments/comments-container/comments-container.component';

@Component({
  selector: 'app-postbar',
  standalone: true,
  imports: [
    ChatSvgComponent,
    HeartSvgComponent,
    ShareSvgComponent,
    IconButtonComponent,
    BookmarkSvgComponent,
    BookmarkFilledSvgComponent,
    CommentsContainerComponent,
  ],
  templateUrl: './postbar.component.html',
  styleUrl: './postbar.component.css',
})
export class PostbarComponent {
  showComments: boolean = false;

  toggleComments(): void {
    this.showComments = !this.showComments;
  }

  get isBookmarked(): boolean {
    return true;
  }
}
