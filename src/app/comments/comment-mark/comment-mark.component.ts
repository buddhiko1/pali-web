import { Component, Input, OnInit } from '@angular/core';

import { BadgeComponent } from 'src/app/ui/badge/badge.component';
import { ChatSvgComponent } from 'src/app/svg/chat/chat.component';
import { CommentStatusEnum } from 'src/app/shared/values/cms.values';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comment-mark',
  standalone: true,
  imports: [BadgeComponent, ChatSvgComponent],
  templateUrl: './comment-mark.component.html',
  styleUrl: './comment-mark.component.css',
})
export class CommentMarkComponent implements OnInit {
  quantity = 0;

  @Input({ required: true })
  blogId!: string;

  constructor(private _commentsService: CommentsService) {}

  ngOnInit(): void {
    this._commentsService
      .fetchQuantityOfBlogComments({
        blogId: this.blogId,
        statusName: CommentStatusEnum.Verified,
      })
      .then((quantity) => {
        this.quantity = quantity;
      });
  }
}
