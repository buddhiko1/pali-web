import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-float-buttons',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './float-buttons.component.html',
  styleUrls: ['./float-buttons.component.css'],
})
export class FloatButtonsComponent {}
