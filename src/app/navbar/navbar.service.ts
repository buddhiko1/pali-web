import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  isDark: Boolean;

  constructor() {
    this.isDark = false;
  }

  toggleDark(): void {
    console.log("toggle dark")
    this.isDark = !this.isDark;
  }
}
