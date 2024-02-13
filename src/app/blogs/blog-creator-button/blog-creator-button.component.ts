import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PenSvgComponent } from 'src/app/svg/pen/pen.component';
import { IconButtonComponent } from 'src/app/ui/icon-button/icon-button.component';

@Component({
  selector: 'app-blog-creator-button',
  standalone: true,
  imports: [PenSvgComponent, IconButtonComponent],
  templateUrl: './blog-creator-button.component.html',
  styleUrl: './blog-creator-button.component.css',
})
export class BlogCreatorButtonComponent {
  @Input() size = '1.5rem';

  constructor(private _router: Router) {}

  routeToBlogCreator() {
    this._router.navigate(['/blogs/creator']);
  }
}
