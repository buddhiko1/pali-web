import { Component } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-person-svg',
  standalone: true,
  imports: [],
  templateUrl: './person.component.svg',
})
export class PersonSvgComponent extends SvgComponent {}
