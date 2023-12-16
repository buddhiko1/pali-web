import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WysiwygComponent } from '../wysiwyg/wysiwyg.component';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, WysiwygComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent {}
