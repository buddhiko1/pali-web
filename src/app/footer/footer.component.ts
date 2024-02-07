import { Component } from '@angular/core';
import { HeartSvgComponent } from '../svg/heart/heart.component';
import { FadeInDirective } from '../shared/directives/fade-in.directive';
import { IconButtonComponent } from '../ui/icon-button/icon-button.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [HeartSvgComponent, FadeInDirective, IconButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
