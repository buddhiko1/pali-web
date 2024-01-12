import * as tailwindConfig from '../../../../tailwind.config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  get isPhone(): boolean {
    return (
      window.innerWidth <
      parseInt(tailwindConfig.default.theme.screens.tablet, 10)
    );
  }

  get isTablet(): boolean {
    return (
      window.innerWidth >=
        parseInt(tailwindConfig.default.theme.screens.tablet, 10) &&
      window.innerWidth < parseInt(tailwindConfig.default.theme.screens.pc, 10)
    );
  }

  get isPc(): boolean {
    return (
      window.innerWidth > parseInt(tailwindConfig.default.theme.screens.pc, 10)
    );
  }
}
