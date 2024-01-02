import { Component } from '@angular/core';

import { ScreenService } from 'src/app/shared/services/screen.service';
import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';
import { WheelSvgComponent } from 'src/app/svg/wheel/wheel.component';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [FadeInDirective, WheelSvgComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {
  constructor(private _screen: ScreenService) {}

  get isPhone(): boolean {
    return this._screen.isPhone;
  }
}
