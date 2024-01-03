import { Injectable } from '@angular/core';

import { DataUrqlService } from '../urql/urql.service';
import {
  BlogFragment,
  BlogsDocument,
  BlogsQueryVariables,
  BlogByIdDocument,
  BlogByIdQueryVariables,
  BlogStatusDocument,
  BlogStatusQueryVariables,
  Blog_Status,
  UserBlogsDocument,
  UserBlogsQueryVariables,
  CreateBlogDocument,
  CreateBlogMutationVariables,
  DeleteBlogDocument,
  DeleteBlogMutationVariables,
  UpdateBlogDocument,
  UpdateBlogMutationVariables,
} from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private _urqlService: DataUrqlService) {}

  async fetchBlogStatusInputFor(
    args: BlogStatusQueryVariables,
  ): Promise<Blog_Status> {
    const result = await this._urqlService.query(BlogStatusDocument, args);
    return result.data.statusList[0];
  }

  async fetchBlogById(args: BlogByIdQueryVariables): Promise<BlogFragment> {
    const result = await this._urqlService.query(BlogByIdDocument, args);
    return result.data.blog;
  }

  async fetchBlogs(args: BlogsQueryVariables): Promise<BlogFragment[]> {
    const result = await this._urqlService.query(BlogsDocument, args);
    return result.data.blogs;
  }

  async fetchUserBlogs(args: UserBlogsQueryVariables): Promise<BlogFragment[]> {
    const result = await this._urqlService.query(UserBlogsDocument, args);
    return result.data.blogs;
  }

  async updateBlog(args: UpdateBlogMutationVariables): Promise<BlogFragment> {
    const result = await this._urqlService.mutation(UpdateBlogDocument, args);
    return result.data.blog;
  }

  async createBlog(args: CreateBlogMutationVariables): Promise<BlogFragment> {
    const result = await this._urqlService.mutation(CreateBlogDocument, args);
    return result.data.blog;
  }

  async deleteBlog(args: DeleteBlogMutationVariables): Promise<void> {
    await this._urqlService.mutation(DeleteBlogDocument, args);
  }
}
