import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BlogStatusNameEnum } from '../shared/values/cms.values';
import { BlogsService } from './blogs.service';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterLink, BlogListComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent {
  blogs: BlogFragment[] = [];

  constructor(private _blogsService: BlogsService) {
    this._fetchPublishedBlogs().then((blogs) => {
      this.blogs = blogs;
    });
  }

  private async _fetchPublishedBlogs(): Promise<BlogFragment[]> {
    return await this._blogsService.fetchBlogs({
      statusName: BlogStatusNameEnum.Published,
      sortFields: ['-date_created'],
      offset: 0,
      limit: -1,
      returnContent: false,
    });
  }
}
