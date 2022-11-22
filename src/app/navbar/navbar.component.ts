import { Component } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isOpen: boolean;

  constructor(private navbarService: NavbarService) {
    this.isOpen = false;
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  get isDark(): boolean {
    return this.navbarService.isDark;
  }

  toggleDark(): void {
    this.navbarService.toggleDark();
  }
}
