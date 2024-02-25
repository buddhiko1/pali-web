import { Component } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-heart-filled-svg',
  standalone: true,
  imports: [],
  templateUrl: './heart-filled.component.svg',
})
export class HeartFilledSvgComponent extends SvgComponent {}
