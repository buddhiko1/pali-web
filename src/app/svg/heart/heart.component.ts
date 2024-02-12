import { Component } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-heart-svg',
  standalone: true,
  imports: [],
  templateUrl: './heart.component.svg',
})
export class HeartSvgComponent extends SvgComponent {}
