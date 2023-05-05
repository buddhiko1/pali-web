import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { OverlayService } from 'src/app/overlay/overlay.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  constructor(private _overlayService: OverlayService) {
    this._overlayService.active(true);
  }
}
