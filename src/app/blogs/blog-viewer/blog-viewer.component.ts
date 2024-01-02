import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogsService } from '../blogs.service';
import { BlogWithContentFragment } from 'src/gql/graphql';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-blog-viewer',
  standalone: true,
  imports: [SafeHtmlPipe],
  templateUrl: './blog-viewer.component.html',
  styleUrl: './blog-viewer.component.css',
})
export class BlogViewerComponent implements OnInit {
  blog!: BlogWithContentFragment;

  constructor(
    private _route: ActivatedRoute,
    private _blogsService: BlogsService,
  ) {}

  ngOnInit(): void {
    const blogId = this._route.snapshot.paramMap.get('id')!;
    this._blogsService.fetchBlogById(blogId).then((blog) => {
      this.blog = blog;
    });
  }
}
