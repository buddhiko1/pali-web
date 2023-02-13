import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BackButtonDirective } from '../back-button.directive';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, BackButtonDirective],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent {}
