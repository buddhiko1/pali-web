import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { interval } from 'rxjs';

import { WysiwygComponent } from 'src/app/ui/wysiwyg/wysiwyg.component';
import { BlogStatusNameEnum } from 'src/app/shared/values/cms.values';
import { StorageService } from 'src/app/shared/services/storage.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { IconButtonComponent } from 'src/app/ui/icon-button/icon-button.component';
import { SaveSvgComponent } from 'src/app/svg/save/save.component';
import { UploadSvgComponent } from 'src/app/svg/upload/upload.component';
import { DeleteSvgComponent } from 'src/app/svg/delete/delete.component';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-blog-creator',
  standalone: true,
  imports: [
    FormsModule,
    WysiwygComponent,
    IconButtonComponent,
    SaveSvgComponent,
    UploadSvgComponent,
    DeleteSvgComponent,
  ],
  templateUrl: './blog-creator.component.html',
  styleUrl: './blog-creator.component.css',
})
export class BlogCreatorComponent implements OnInit {
  @ViewChild('wysiwyg') wysiwyg!: WysiwygComponent;
  blogId = '';
  title = '';
  initialContent = '';
  isSavingDraft = false;
  isPublishing = false;

  constructor(
    private _router: Router,
    private _storageService: StorageService,
    private _notificationsService: NotificationsService,
    private _blogsService: BlogsService,
  ) {}

  ngOnInit(): void {
    this._fetchLatestDraft();
    // interval(1000 * 60 * 5).subscribe(() => {
    //   this.saveDraft();
    // });
  }

  get isSaved(): boolean {
    return !!this.blogId;
  }

  get isAllowedToSave(): boolean {
    return this.title !== '' && this.wysiwyg.content !== '';
  }

  get isAllowedToPublish(): boolean {
    return this.title !== '' && this.wysiwyg.content !== '';
  }

  private async _fetchLatestDraft(): Promise<void> {
    const result = await this._blogsService.fetchUserBlogs({
      userId: this._storageService.account!.id,
      statusNameList: [BlogStatusNameEnum.Draft],
      sortFields: ['-date_created'],
      offset: 0,
      limit: 1,
      returnContent: true,
    });
    if (result.length) {
      const draft = result[0];
      this.blogId = draft.id;
      this.title = draft.title;
      this.initialContent = draft.content!;
    }
  }

  async saveDraft(): Promise<void> {
    this.isSavingDraft = true;
    const blogStatusInput = await this._blogsService.fetchBlogStatusInputFor({
      name: BlogStatusNameEnum.Draft,
    });
    if (this.blogId) {
      await this._blogsService
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
    } else {
      this._blogsService
        .createBlog({
          data: {
            title: this.title,
            content: this.wysiwyg.content,
            status: { id: blogStatusInput.id, name: blogStatusInput.name },
          },
          returnContent: true,
        })
        .then((savedDraft) => {
          this.blogId = savedDraft.id;
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
  }

  async publish(): Promise<void> {
    this.isPublishing = true;
    const blogStatusInput = await this._blogsService.fetchBlogStatusInputFor({
      name: BlogStatusNameEnum.Published,
    });
    if (this.blogId) {
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
          this.isPublishing = false;
        });
    } else {
      this._blogsService
        .createBlog({
          data: {
            title: this.title,
            content: this.wysiwyg.content,
            status: { id: blogStatusInput.id, name: blogStatusInput.name },
          },
          returnContent: true,
        })
        .then((publishedBlog) => {
          this._router.navigate(['/blogs/viewer', publishedBlog.id]);
        })
        .catch((error) => {
          this._notificationsService.pushErrorInfo({
            title: 'Publish Error',
            content: error.toString(),
          });
          this.isPublishing = false;
        });
    }
  }
}
