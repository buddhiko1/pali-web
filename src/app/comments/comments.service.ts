import { Injectable } from '@angular/core';

import { DataUrqlService } from '../shared/services/urql.service';
import {
  CommentFragment,
  BlogCommentsDocument,
  BlogCommentsQueryVariables,
  QuantityOfBlogCommentsDocument,
  QuantityOfBlogCommentsQueryVariables,
  UserCommentsDocument,
  UserCommentsQueryVariables,
  CreateCommentDocument,
  CreateCommentMutationVariables,
  DeleteCommentDocument,
  DeleteCommentMutationVariables,
  UpdateCommentDocument,
  UpdateCommentMutationVariables,
  Comment_Status,
  CommentStatusDocument,
  CommentStatusQueryVariables,
} from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private _dataUrqlService: DataUrqlService) {}

  async fetchCommentStatusInputFor(
    args: CommentStatusQueryVariables,
  ): Promise<Comment_Status> {
    const result = await this._dataUrqlService.query(
      CommentStatusDocument,
      args,
    );
    return result.data.status[0];
  }

  async fetchBlogComments(
    args: BlogCommentsQueryVariables,
  ): Promise<CommentFragment[]> {
    const result = await this._dataUrqlService.query(
      BlogCommentsDocument,
      args,
    );
    return result.data.comments;
  }

  async fetchQuantityOfBlogComments(
    args: QuantityOfBlogCommentsQueryVariables,
  ): Promise<number> {
    const result = await this._dataUrqlService.query(
      QuantityOfBlogCommentsDocument,
      args,
    );
    return result.data.comments_aggregated[0].count.id;
  }

  async fetchUserComments(
    args: UserCommentsQueryVariables,
  ): Promise<CommentFragment[]> {
    const result = await this._dataUrqlService.query(
      UserCommentsDocument,
      args,
    );
    return result.data.comments;
  }

  async updateComment(
    args: UpdateCommentMutationVariables,
  ): Promise<CommentFragment> {
    const result = await this._dataUrqlService.mutation(
      UpdateCommentDocument,
      args,
    );
    return result.data.comment;
  }

  async createComment(
    args: CreateCommentMutationVariables,
  ): Promise<CommentFragment> {
    const result = await this._dataUrqlService.mutation(
      CreateCommentDocument,
      args,
    );
    return result.data.comment;
  }

  async deleteComment(args: DeleteCommentMutationVariables): Promise<void> {
    await this._dataUrqlService.mutation(DeleteCommentDocument, args);
  }
}
