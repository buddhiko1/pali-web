import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FadeInDirective } from './shared/directives/fade-in.directive';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarService } from './navbar/navbar.service';
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
  constructor(private _navbarService: NavbarService) {}

  get theme(): string {
    return this._navbarService.theme;
  }
  title = 'pali-web';
}
