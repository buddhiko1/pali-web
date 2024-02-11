import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { WysiwygComponent } from 'src/app/ui/wysiwyg/wysiwyg.component';
import { IconButtonComponent } from 'src/app/ui/icon-button/icon-button.component';
import { SaveSvgComponent } from 'src/app/svg/save/save.component';
import { UploadSvgComponent } from 'src/app/svg/upload/upload.component';
import { DeleteSvgComponent } from 'src/app/svg/delete/delete.component';
import { EyeSvgComponent } from 'src/app/svg/eye/eye.component';
import { BlogStatusNameEnum } from 'src/app/shared/values/cms.values';
import { NotificationsService } from 'src/app/notifications/notifications.service';
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
    EyeSvgComponent,
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
    private _notificationsService: NotificationsService,
  ) {}

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

  get isSavedBlog(): boolean {
    return !!this.blogId;
  }

  get isAllowedToSave(): boolean {
    return this.title !== '' && this.wysiwyg.content !== '';
  }

  get isAllowedToPublish(): boolean {
    return this.title !== '' && this.wysiwyg.content !== '';
  }

  async saveDraft(): Promise<void> {
    this.isSavingDraft = true;
    const blogStatusInput = await this._blogsService.fetchBlogStatusInputFor({
      name: BlogStatusNameEnum.Draft,
    });
    this._blogsService
      .updateBlog({
        id: this.blogId,
        data: {
          title: this.title,
          content: this.wysiwyg.content,
          status: { id: blogStatusInput.id },
        },
        returnContent: true,
      })
      .catch((error) => {
        this._notificationsService.pushErrorInfo({
          title: 'Save Draft Error',
          content: error.toString(),
        });
      })
      .finally(() => {
        this.isSavingDraft = false;
      });
  }

  async publish(): Promise<void> {
    this.isPublishing = true;
    const blogStatusInput = await this._blogsService.fetchBlogStatusInputFor({
      name: BlogStatusNameEnum.Published,
    });
    this._blogsService
      .updateBlog({
        id: this.blogId,
        data: {
          title: this.title,
          content: this.wysiwyg.content,
          status: { id: blogStatusInput.id },
        },
        returnContent: true,
      })
      .then(() => {
        this._router.navigate(['/blogs/viewer', this.blogId]);
      })
      .catch((error) => {
        this._notificationsService.pushErrorInfo({
          title: 'Publish Error',
          content: error.toString(),
        });
      })
      .finally(() => {
        this.isPublishing = false;
      });
  }
}
