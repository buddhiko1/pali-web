import { Component } from '@angular/core';
import { OverlayService } from './overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
})
export class OverlayComponent {
  constructor(private overlayService: OverlayService) {}

  get isActive(): boolean {
    return this.overlayService.isActive;
  }
}
