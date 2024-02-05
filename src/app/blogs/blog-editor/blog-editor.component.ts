import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';

import { WysiwygComponent } from 'src/app/ui/wysiwyg/wysiwyg.component';
import { BlogStatusNameEnum } from 'src/app/shared/values/cms.values';
import { StorageService } from 'src/app/shared/services/storage.service';
import { BlogsService } from '../blogs.service';

const OperationTypeEnum = {
  Create: 'Create',
  Edit: 'Edit',
};

@Component({
  selector: 'app-blog-editor',
  standalone: true,
  imports: [FormsModule, WysiwygComponent],
  templateUrl: './blog-editor.component.html',
  styleUrl: './blog-editor.component.css',
})
export class BlogEditorComponent implements OnInit {
  @ViewChild('wysiwyg') wysiwyg!: WysiwygComponent;
  title = '';
  initialContent = '';
  private _blogId = '';
  private _operationType = OperationTypeEnum.Create;

  constructor(
    private _route: ActivatedRoute,
    private _storageService: StorageService,
    private _blogsService: BlogsService,
  ) {}

  get isCreation(): boolean {
    return this._operationType === OperationTypeEnum.Create;
  }

  ngOnInit(): void {
    const blogId = this._route.snapshot.paramMap.get('id');
    if (blogId) {
      this._blogsService
        .fetchBlogById({ id: blogId, returnContent: true })
        .then((blog) => {
          this.title = blog.title;
          this.initialContent = blog.content!;
          this._blogId = blog.id;
          this._operationType = OperationTypeEnum.Edit;
        });
    } else {
      this._fetchLatestDraft();
      interval(30000).subscribe(() => {
        // this.saveDraft();
      });
    }
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
      this._blogId = draft.id;
      this.title = draft.title;
      this.initialContent = draft.content!;
    }
  }

  async saveDraft(): Promise<void> {
    const blogStatusInput = await this._blogsService.fetchBlogStatusInputFor({
      name: BlogStatusNameEnum.Draft,
    });
    if (this._blogId) {
      const savedDraft = await this._blogsService.updateBlog({
        id: this._blogId,
        data: {
          title: this.title,
          content: this.wysiwyg.content,
          status: { id: blogStatusInput.id },
        },
        returnContent: true,
      });
      this._blogId = savedDraft.id;
    } else {
      const savedDraft = await this._blogsService.createBlog({
        data: {
          title: this.title,
          content: this.wysiwyg.content,
          status: { id: blogStatusInput.id, name: blogStatusInput.name },
        },
        returnContent: true,
      });
      this._blogId = savedDraft.id;
    }
  }

  async publish(): Promise<void> {
    const blogStatusInput = await this._blogsService.fetchBlogStatusInputFor({
      name: BlogStatusNameEnum.Published,
    });
    if (this._operationType === OperationTypeEnum.Edit) {
      await this._blogsService.updateBlog({
        id: this._blogId,
        data: {
          title: this.title,
          content: this.wysiwyg.content,
          status: { id: blogStatusInput.id },
        },
        returnContent: true,
      });
    } else {
      if (this._blogId) {
        await this._blogsService.updateBlog({
          id: this._blogId,
          data: {
            title: this.title,
            content: this.wysiwyg.content,
            status: { id: blogStatusInput.id },
          },
          returnContent: true,
        });
      } else {
        await this._blogsService.createBlog({
          data: {
            title: this.title,
            content: this.wysiwyg.content,
            status: { id: blogStatusInput.id, name: blogStatusInput.name },
          },
          returnContent: true,
        });
      }
    }
  }
}
