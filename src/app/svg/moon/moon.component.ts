import { Component } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-moon-svg',
  standalone: true,
  imports: [],
  templateUrl: './moon.component.svg',
})
export class MoonSvgComponent extends SvgComponent {}
