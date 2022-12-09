import { Component } from '@angular/core';
import { NavbarService } from './navbar/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pali-web';

  constructor(private navbarService: NavbarService) {}

  get isDark(): boolean {
    return this.navbarService.isDark;
  }
  get openMenu(): boolean {
    return this.navbarService.openMenu;
  }
}
