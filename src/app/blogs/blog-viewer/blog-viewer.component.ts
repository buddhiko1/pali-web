import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogsService } from '../blogs.service';
import { StorageService } from 'src/app/shared/services/storage.service';
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
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
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

  routeToEditor() {
    this._router.navigate(['/blogs/editor', { id: this.blog.id }]);
  }

  get isMyBlog() {
    if (this._storageService.isLoggedIn && this.blog) {
      return this.blog.user_created?.id === this._storageService.account.id;
    }
    return false;
  }
}
