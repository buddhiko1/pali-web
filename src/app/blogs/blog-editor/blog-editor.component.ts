import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { interval } from 'rxjs';
import { WysiwygComponent } from 'src/app/wysiwyg/wysiwyg.component';
import { BlogStatusNameEnum } from 'src/app/shared/values/cms.values';
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
    private _blogsService: BlogsService,
  ) {}

  get isCreation(): boolean {
    return this._operationType === OperationTypeEnum.Create;
  }

  ngOnInit(): void {
    const blogId = this._route.snapshot.paramMap.get('id');
    if (blogId) {
      this._blogsService.fetchBlogById(blogId).then((blog) => {
        this.title = blog.title;
        this.initialContent = blog.content;
        this._blogId = blog.id;
        this._operationType = OperationTypeEnum.Edit;
      });
    } else {
      this.fetchLatestDraft();
      interval(30000).subscribe(() => {
        console.error('start save draft');
        // this.saveDraft();
      });
    }
  }

  async saveDraft(): Promise<void> {
    const title = this.title;
    const content = this.wysiwyg.content;
    const savedDraft = await this._blogsService.saveDraft(
      this._blogId,
      title,
      content,
    );
    this._blogId = savedDraft.id;
  }

  async fetchLatestDraft(): Promise<void> {
    const draft = await this._blogsService.fetchLatestDraft();
    if (draft) {
      this._blogId = draft.id;
      this.title = draft.title;
      this.wysiwyg.initialContent = draft.content;
    }
  }

  async publish(): Promise<void> {
    if (this._operationType === OperationTypeEnum.Edit) {
      await this._blogsService.updateBlog(
        this._blogId,
        this.title,
        this.wysiwyg.content,
        BlogStatusNameEnum.Published,
      );
    } else {
      if (this._blogId) {
        await this._blogsService.updateBlog(
          this._blogId,
          this.title,
          this.wysiwyg.content,
          BlogStatusNameEnum.Published,
        );
      } else {
        await this._blogsService.createBlog(
          this.title,
          this.wysiwyg.content,
          BlogStatusNameEnum.Published,
        );
      }
    }
  }
}
