import { Injectable } from '@angular/core';

import { DataUrqlService } from '../shared/services/urql.service';
import {
  BlogFragment,
  BlogsDocument,
  BlogsQueryVariables,
  BlogByIdDocument,
  BlogByIdQueryVariables,
  CreateBlogDocument,
  CreateBlogMutationVariables,
  DeleteBlogDocument,
  DeleteBlogMutationVariables,
  UpdateBlogDocument,
  UpdateBlogMutationVariables,
  Blog_Status,
  BlogStatusDocument,
  BlogStatusQueryVariables,
  UserBlogsDocument,
  UserBlogsQueryVariables,
} from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private _dataUrqlService: DataUrqlService) {}

  async fetchBlogStatusInputFor(
    args: BlogStatusQueryVariables,
  ): Promise<Blog_Status> {
    const result = await this._dataUrqlService.query(BlogStatusDocument, args);
    return result.data.status[0];
  }

  async fetchBlogById(args: BlogByIdQueryVariables): Promise<BlogFragment> {
    const result = await this._dataUrqlService.query(BlogByIdDocument, args);
    return result.data.blog;
  }

  async fetchBlogs(args: BlogsQueryVariables): Promise<BlogFragment[]> {
    const result = await this._dataUrqlService.query(BlogsDocument, args);
    return result.data.blogs;
  }

  async fetchUserBlogs(args: UserBlogsQueryVariables): Promise<BlogFragment[]> {
    const result = await this._dataUrqlService.query(UserBlogsDocument, args);
    return result.data.blogs;
  }

  async updateBlog(args: UpdateBlogMutationVariables): Promise<BlogFragment> {
    const result = await this._dataUrqlService.mutation(
      UpdateBlogDocument,
      args,
    );
    return result.data.blog;
  }

  async createBlog(args: CreateBlogMutationVariables): Promise<BlogFragment> {
    const result = await this._dataUrqlService.mutation(
      CreateBlogDocument,
      args,
    );
    return result.data.blog;
  }

  async deleteBlog(args: DeleteBlogMutationVariables): Promise<void> {
    await this._dataUrqlService.mutation(DeleteBlogDocument, args);
  }
}
