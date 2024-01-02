import { Component } from '@angular/core';
import { HeartSvgComponent } from '../svg/heart/heart.component';
import { FadeInDirective } from '../shared/directives/fade-in.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [HeartSvgComponent, FadeInDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
