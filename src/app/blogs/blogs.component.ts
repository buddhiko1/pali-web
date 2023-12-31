import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

import { WysiwygComponent } from '../wysiwyg/wysiwyg.component';
import { BlogStatusNameEnum } from '../shared/values/cms.values';
import { BlogsService } from './blogs.service';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, WysiwygComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements AfterViewInit {
  @ViewChild('wysiwyg') wysiwyg!: WysiwygComponent;

  initialContent = '';
  private _draftId = '';

  constructor(private _blogsService: BlogsService) {
    this._blogsService.fetchPublishedBlogs().then((blogs) => {
      console.error(blogs);
    });
    this.fetchDraft();
  }

  ngAfterViewInit(): void {
    // save draft automatically
    interval(15000).subscribe(() => {
      // this.saveDraft();
    });
  }

  async saveDraft(): Promise<void> {
    const content = this.wysiwyg.content;
    const savedDraft = await this._blogsService.saveDraft(
      this._draftId,
      content,
    );
    if (!this._draftId) {
      this._draftId = savedDraft.id;
    }
  }

  async fetchDraft(): Promise<void> {
    const draft = await this._blogsService.fetchDraft();
    if (draft) {
      this._draftId = draft.id;
      this.wysiwyg.initialContent = draft.content;
    }
  }

  async publish(): Promise<void> {
    await this._blogsService
      .createBlog('test creat blog', BlogStatusNameEnum.Draft)
      .then((blog) => {
        console.error('created blog:', blog.content);
      });
  }
}
