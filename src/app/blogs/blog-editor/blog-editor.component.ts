import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { WysiwygComponent } from 'src/app/ui/wysiwyg/wysiwyg.component';
import { BlogStatusNameEnum } from 'src/app/shared/values/cms.values';
import { IconButtonComponent } from 'src/app/ui/icon-button/icon-button.component';
import { SaveSvgComponent } from 'src/app/svg/save/save.component';
import { UploadSvgComponent } from 'src/app/svg/upload/upload.component';
import { DeleteSvgComponent } from 'src/app/svg/delete/delete.component';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-blog-editor',
  standalone: true,
  imports: [
    FormsModule,
    WysiwygComponent,
    IconButtonComponent,
    SaveSvgComponent,
    UploadSvgComponent,
    DeleteSvgComponent,
  ],
  templateUrl: './blog-editor.component.html',
  styleUrl: './blog-editor.component.css',
})
export class BlogEditorComponent implements OnInit {
  @ViewChild('wysiwyg') wysiwyg!: WysiwygComponent;
  blogId = '';
  title = '';
  initialContent = '';
  isSavingDraft = false;
  isPublishing = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _blogsService: BlogsService,
  ) {}

  get isSavedBlog(): boolean {
    return !!this.blogId;
  }

  ngOnInit(): void {
    const blogId = this._activatedRoute.snapshot.paramMap.get('id')!;
    this._blogsService
      .fetchBlogById({ id: blogId, returnContent: true })
      .then((blog) => {
        this.title = blog.title;
        this.initialContent = blog.content!;
        this.blogId = blog.id;
      });
  }

  async saveDraft(): Promise<void> {
    this.isSavingDraft = true;
    const blogStatusInput = await this._blogsService.fetchBlogStatusInputFor({
      name: BlogStatusNameEnum.Draft,
    });
    await this._blogsService.updateBlog({
      id: this.blogId,
      data: {
        title: this.title,
        content: this.wysiwyg.content,
        status: { id: blogStatusInput.id },
      },
      returnContent: true,
    });
    this.isSavingDraft = false;
  }

  async publish(): Promise<void> {
    this.isPublishing = true;
    const blogStatusInput = await this._blogsService.fetchBlogStatusInputFor({
      name: BlogStatusNameEnum.Published,
    });
    await this._blogsService.updateBlog({
      id: this.blogId,
      data: {
        title: this.title,
        content: this.wysiwyg.content,
        status: { id: blogStatusInput.id },
      },
      returnContent: true,
    });
    this.isPublishing = false;
    this._router.navigate(['/blogs/viewer', this.blogId]);
  }
}
