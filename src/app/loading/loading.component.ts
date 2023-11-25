import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenService } from '../shared/services/screen.service';
import { FadeInDirective } from '../shared/directives/fade-in.directive';
import { WheelSvgComponent } from '../svg/wheel/wheel.component';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, FadeInDirective, WheelSvgComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {
  constructor(private _screen: ScreenService) {}

  get isPhone(): boolean {
    return this._screen.isPhone;
  }
}
