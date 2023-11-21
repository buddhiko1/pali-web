import * as tailwindConfig from '../../../tailwind.config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  get isPhone(): boolean {
    return (
      window.screen.availWidth <
      parseInt(tailwindConfig.default.theme.screens.tablat, 100)
    );
  }

  get isTablat(): boolean {
    return (
      window.screen.availWidth >=
        parseInt(tailwindConfig.default.theme.screens.tablat, 100) &&
      window.screen.availWidth <
        parseInt(tailwindConfig.default.theme.screens.pc, 100)
    );
  }

  get isPc(): boolean {
    return (
      window.screen.availWidth >
      parseInt(tailwindConfig.default.theme.screens.pc, 100)
    );
  }
}
