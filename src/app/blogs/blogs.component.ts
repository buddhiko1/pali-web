import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BlogStatusNameEnum } from '../shared/values/cms.values';
import { ScreenService } from '../shared/services/screen.service';
import { BlogsService } from './blogs.service';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogAddButtonComponent } from './blog-add-button/blog-add-button.component';
import { BlogFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterLink, BlogListComponent, BlogAddButtonComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent {
  blogs: BlogFragment[] = [];

  constructor(
    private _blogsService: BlogsService,
    private _screenService: ScreenService,
  ) {
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

  get isPc(): boolean {
    return this._screenService.isPc;
  }
}
