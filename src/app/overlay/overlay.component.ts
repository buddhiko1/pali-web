import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.css',
})
export class OverlayComponent {
  @HostBinding('style.--zIndex')
  @Input()
  zIndex!: number;
  @HostBinding('style.--opacity')
  @Input()
  opacity = 0.4;
}
