import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
})
export class OverlayComponent {
  @Input() zIndex!: number;
  @Input() opacity = 0.4;

  @HostBinding('style.--zIndex') get inputIndex() {
    return this.zIndex;
  }
  @HostBinding('style.--opacity') get inputOpacity() {
    return this.opacity;
  }
}
