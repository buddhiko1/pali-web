import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UrlService } from '../shared/services/url.service';
import { BlogStatusNameEnum } from '../shared/values/cms.values';
import { BlogsService } from './blogs.service';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [BlogListComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent {
  blogs: BlogFragment[] = [];

  constructor(
    private _urlService: UrlService,
    private _router: Router,
    private _blogsService: BlogsService,
  ) {
    this._fetchPublishedBlogs().then((blogs) => {
      this.blogs = blogs;
    });
  }

  routeToBlogEditor(): void {
    this._router.navigateByUrl(this._urlService.urlForBlogEditor);
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
