import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  isDark: boolean;

  constructor() {
    this.isDark = false;
  }

  toggleDark(): void {
    console.log('toggle dark');
    this.isDark = !this.isDark;
  }
}
