import { Component, ViewChild, Input, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

import { UploadAdapterPlugin } from './ckeditor.uploadAdapter';

@Component({
  selector: 'app-wysiwyg',
  standalone: true,
  imports: [FormsModule, CKEditorModule],
  templateUrl: './wysiwyg.component.html',
  styleUrl: './wysiwyg.component.css',
})
export class WysiwygComponent {
  @ViewChild('editor') editorComponent!: CKEditorComponent;
  Editor = Editor;
  @Input()
  initialContent = '';

  @Input()
  @HostBinding('style.--height')
  height = '50vh';

  constructor() {}

  get config(): object {
    return {
      extraPlugins: [UploadAdapterPlugin],
    };
  }

  get editor() {
    return this.editorComponent.editorInstance;
  }

  get content(): string {
    if (this.editor) {
      return this.editor.data.get();
    }
    return '';
  }
}
