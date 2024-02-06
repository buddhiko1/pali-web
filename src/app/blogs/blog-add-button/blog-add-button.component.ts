import { Component, Input, HostBinding } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PlusSvgComponent } from 'src/app/svg/plus/plus.component';

@Component({
  selector: 'app-blog-add-button',
  standalone: true,
  imports: [RouterLink, PlusSvgComponent],
  templateUrl: './blog-add-button.component.html',
  styleUrl: './blog-add-button.component.css',
})
export class BlogAddButtonComponent {
  @Input() size = '1.5rem';

  @HostBinding('style.--height') get height() {
    return this.size;
  }

  @HostBinding('style.--width') get width() {
    return this.size;
  }
}
