import { Pipe, PipeTransform } from '@angular/core';
import { ScreenService } from 'src/app/shared/services/screen.service';

@Pipe({
  standalone: true,
  name: 'overView',
})
export class OverViewPipe implements PipeTransform {
  constructor(private _screenService: ScreenService) {}

  transform(value: string): string {
    if (this._screenService.isPhone) {
      if (value.length > 50) {
        return value.slice(0, 50) + '...';
      }
    } else {
      if (value.length > 80) {
        return value.slice(0, 80) + '...';
      }
    }
    return value;
  }
}
