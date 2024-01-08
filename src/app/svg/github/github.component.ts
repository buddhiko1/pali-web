import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-github-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './github.component.svg',
})
export class GithubSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
