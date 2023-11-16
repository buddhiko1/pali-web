import { Component } from '@angular/core';

import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    FooterComponent,
    NotificationComponent,
  ],
})
export class AppComponent {
  title = 'pali-web';
}
