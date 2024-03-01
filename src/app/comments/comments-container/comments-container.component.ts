import { Component } from '@angular/core';

import { DownSvgComponent } from 'src/app/svg/down/down.component';
import { IconButtonComponent } from 'src/app/ui/icon-button/icon-button.component';

@Component({
  selector: 'app-comments-container',
  standalone: true,
  imports: [DownSvgComponent, IconButtonComponent],
  templateUrl: './comments-container.component.html',
  styleUrl: './comments-container.component.css',
})
export class CommentsContainerComponent {
  show: boolean = true;

  toggle(): void {
    this.show = !this.show;
  }
}
