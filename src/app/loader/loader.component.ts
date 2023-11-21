import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadeInDirective } from '../core/fade-in.directive';
import { ScreenService } from '../core/screen.service';
import { OverlayComponent } from '../overlay/overlay.component';
import { WheelSvgComponent } from '../svg/wheel/wheel.component';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, FadeInDirective, OverlayComponent, WheelSvgComponent],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  @Input() title = '';
  @Input() errorInfo = '';
  @Input() successInfo = '';
  @Output() done = new EventEmitter<void>();

  constructor(private _screenService: ScreenService) {}

  get isPhone(): boolean {
    return this._screenService.isPhone;
  }

  onSubmit() {
    this.done.emit();
  }
}
