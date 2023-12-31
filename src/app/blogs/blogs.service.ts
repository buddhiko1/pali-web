import { Injectable } from '@angular/core';

import { BlogStatusNameEnum } from '../shared/values/cms.values';
import { StorageService } from '../shared/services/storage.service';
import { DataUrqlService } from '../urql/urql.service';
import {
  BlogFragment,
  BlogsDocument,
  BlogsQueryVariables,
  BlogStatusDocument,
  BlogStatusQueryVariables,
  Blog_Status,
  UserBlogsDocument,
  UserBlogsQueryVariables,
  CreateBlogDocument,
  Create_Blogs_Input,
  DeleteBlogDocument,
  DeleteBlogMutationVariables,
  UpdateBlogDocument,
  Update_Blogs_Input,
} from 'src/gql/graphql';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(
    private _urqlService: DataUrqlService,
    private _storageService: StorageService,
  ) {}

  async fetchBlogStatusInputFor(
    statusName: BlogStatusNameEnum,
  ): Promise<Blog_Status> {
    const args: BlogStatusQueryVariables = {
      name: statusName,
    };
    const result = await this._urqlService.query(BlogStatusDocument, args);
    return result.data.statusList[0];
  }

  async fetchBlogs(
    statusName: BlogStatusNameEnum,
    sortFields: string[],
    offset = 0,
    limit = -1,
  ): Promise<BlogFragment[]> {
    const args: BlogsQueryVariables = {
      statusName: statusName,
      sortFields,
      offset,
      limit,
    };
    const result = await this._urqlService.query(BlogsDocument, args);
    return result.data.blogs;
  }

  async updateBlog(
    id: string,
    content: string,
    statusName?: BlogStatusNameEnum,
  ): Promise<BlogFragment> {
    const data: Update_Blogs_Input = {
      content: content,
    };
    if (statusName) {
      const statusForInput = await this.fetchBlogStatusInputFor(statusName);
      data.status = { id: statusForInput.id, name: statusName };
    }
    const result = await this._urqlService.mutation(UpdateBlogDocument, {
      id: id,
      data: data,
    });
    return result.data.blog;
  }

  async createBlog(
    content: string,
    statusName: BlogStatusNameEnum,
  ): Promise<BlogFragment> {
    const statusForInput = await this.fetchBlogStatusInputFor(statusName);
    const data: Create_Blogs_Input = {
      status: { id: statusForInput.id, name: statusName },
      content: content,
    };
    const result = await this._urqlService.mutation(CreateBlogDocument, {
      data: data,
    });
    return result.data.blog;
  }

  async deleteBlog(id: string): Promise<void> {
    const args: DeleteBlogMutationVariables = {
      id: id,
    };
    await this._urqlService.mutation(DeleteBlogDocument, args);
  }

  async fetchPublishedBlogs(): Promise<BlogFragment[]> {
    return await this.fetchBlogs(BlogStatusNameEnum.Published, [
      '-date_created',
    ]);
  }

  async fetchDraft(): Promise<BlogFragment | null> {
    const args: UserBlogsQueryVariables = {
      userId: this._storageService.me!.id,
      statusName: BlogStatusNameEnum.Draft,
      sortFields: ['-date_created'],
      offset: 0,
      limit: 1,
    };
    const result = await this._urqlService.query(UserBlogsDocument, args);
    return result.data.blogs.length > 0 ? result.data.blogs[0] : null;
  }

  async saveDraft(draftId: string, content: string): Promise<BlogFragment> {
    return draftId
      ? await this.updateBlog(draftId, content)
      : await this.createBlog(content, BlogStatusNameEnum.Draft);
  }
}