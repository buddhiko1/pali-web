import { Component, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isOpen: Boolean;

  constructor(private navbarService: NavbarService) {
    this.isOpen = false;
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  get isDark(): Boolean {
    return this.navbarService.isDark;
  }

  toggleDark(): void {
    this.navbarService.toggleDark();
  }
}
