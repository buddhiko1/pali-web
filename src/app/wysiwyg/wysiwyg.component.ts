import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-wysiwyg',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorModule],
  templateUrl: './wysiwyg.component.html',
  styleUrl: './wysiwyg.component.css',
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
})
export class WysiwygComponent {
  content = '';
}
