import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogsService } from '../blogs.service';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';
import { PenSvgComponent } from 'src/app/svg/pen/pen.component';
import { IconButtonComponent } from 'src/app/ui/icon-button/icon-button.component';
import { BlogFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-blog-viewer',
  standalone: true,
  imports: [SafeHtmlPipe, PenSvgComponent, IconButtonComponent],
  templateUrl: './blog-viewer.component.html',
  styleUrl: './blog-viewer.component.css',
})
export class BlogViewerComponent implements OnInit {
  blog!: BlogFragment;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _blogsService: BlogsService,
  ) {}

  ngOnInit(): void {
    const blogId = this._activatedRoute.snapshot.paramMap.get('id')!;
    this._blogsService
      .fetchBlogById({ id: blogId, returnContent: true })
      .then((blog) => {
        this.blog = blog;
      });
  }
}
