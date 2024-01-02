import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UrlService } from '../shared/services/url.service';
import { BlogsService } from './blogs.service';
import { BlogFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [],
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
    this._blogsService.fetchPublishedBlogs().then((blogs) => {
      this.blogs = blogs;
    });
  }

  routeToBlogEditor(): void {
    this._router.navigateByUrl(this._urlService.urlForBlogEditor);
  }
}
