import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FadeInDirective } from './core/fade-in.directive';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    FadeInDirective,
    FooterComponent,
    NotificationComponent,
  ],
})
export class AppComponent {
  title = 'pali-web';
}
