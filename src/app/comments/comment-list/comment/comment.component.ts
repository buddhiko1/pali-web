import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAvatarComponent } from 'src/app/users/user-avatar/user-avatar.component';

import { UserProfileComponent } from 'src/app/users/user-profile/user-profile.component';
import { CommentFragment } from 'src/gql/graphql';
import { CommentsService } from '../../comments.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent, UserProfileComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  @Input()
  inputComment: CommentFragment | null = null;

  @Input()
  commentId: string | null = null;

  private _fetchedComment: CommentFragment | null = null;

  constructor(private _commentsService: CommentsService) {}

  ngOnInit(): void {
    if (this.commentId) {
      this._commentsService
        .fetchCommentById({ id: this.commentId })
        .then((comment) => {
          this._fetchedComment = comment;
        });
    }
  }

  get comment(): CommentFragment | null {
    return this.inputComment || this._fetchedComment;
  }
}
