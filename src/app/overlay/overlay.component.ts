import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayService } from './overlay.service';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
})
export class OverlayComponent {
  constructor(private overlayService: OverlayService) {}

  get isActive(): boolean {
    return this.overlayService.isActive;
  }
}
