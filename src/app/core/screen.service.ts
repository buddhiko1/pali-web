import { ThemeConfig } from 'tailwindcss/types/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  get isPhone(): boolean {
    return window.innerWidth < ThemeConfig.screens.tablat;
  }
  get isTablat(): boolean {
    return (
      ThemeConfig.screens.tablat <= window.innerWidth < ThemeConfig.screens.pc
    );
  }
  get isPc(): boolean {
    return window.innerWidth > ThemeConfig.screens.pc;
  }
}
