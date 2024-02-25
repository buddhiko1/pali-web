import { Component } from '@angular/core';

import { ChatSvgComponent } from '../svg/chat/chat.component';
import { HeartSvgComponent } from '../svg/heart/heart.component';
import { BookmarkSvgComponent } from '../svg/bookmark/bookmark.component';
import { BookmarkFilledSvgComponent } from '../svg/bookmark-filled/bookmark-filled.component';
import { ShareSvgComponent } from '../svg/share/share.component';
import { IconButtonComponent } from '../ui/icon-button/icon-button.component';

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
  ],
  templateUrl: './postbar.component.html',
  styleUrl: './postbar.component.css',
})
export class PostbarComponent {
  get isBookmarked(): boolean {
    return true;
  }
}
