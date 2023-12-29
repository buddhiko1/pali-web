import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CKEditorModule, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

import { UploadAdapterPlugin } from './ckeditor.uploadAdapter';

@Component({
  selector: 'app-wysiwyg',
  standalone: true,
  imports: [CommonModule, FormsModule, CKEditorModule],
  templateUrl: './wysiwyg.component.html',
  styleUrl: './wysiwyg.component.css',
})
export class WysiwygComponent {
  @ViewChild('editor') editorComponent!: CKEditorComponent;
  Editor = Editor;
  content = '';

  constructor() {}

  get config() {
    return {
      extraPlugins: [UploadAdapterPlugin],
    };
  }
}
