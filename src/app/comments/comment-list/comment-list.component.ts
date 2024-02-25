import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { CommentStatusNameEnum } from 'src/app/shared/values/cms.values';
import { CommentFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent {
  @Input()
  comments: CommentFragment[] = [];

  constructor() {}
}
