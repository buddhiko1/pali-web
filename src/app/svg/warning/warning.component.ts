import { Component } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-warning-svg',
  standalone: true,
  imports: [],
  templateUrl: './warning.component.svg',
})
export class WarningSvgComponent extends SvgComponent {}
