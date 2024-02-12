import { Component } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-pen-svg',
  standalone: true,
  imports: [],
  templateUrl: './pen.component.svg',
})
export class PenSvgComponent extends SvgComponent {}
