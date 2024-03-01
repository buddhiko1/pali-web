import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { CommentStatusNameEnum } from 'src/app/shared/values/cms.values';
import { CommentComponent } from './comment/comment.component';
import { CommentFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, CommentComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent {
  @Input({ required: true })
  comments: CommentFragment[] = [];
}
