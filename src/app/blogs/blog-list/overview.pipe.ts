import { Pipe, PipeTransform } from '@angular/core';
import { ScreenService } from 'src/app/shared/services/screen.service';

@Pipe({
  standalone: true,
  name: 'overView',
})
export class OverViewPipe implements PipeTransform {
  lengthForPhone: number = 30;
  lengthForTablet: number = 40;
  lengthForPc: number = 80;

  constructor(private _screenService: ScreenService) {}

  transform(value: string): string {
    if (this._screenService.isPhone) {
      if (value.length > this.lengthForPhone) {
        return value.slice(0, this.lengthForPhone) + '...';
      }
    } else if (this._screenService.isTablet) {
      if (value.length > this.lengthForTablet) {
        return value.slice(0, this.lengthForTablet) + '...';
      }
    } else {
      if (value.length > this.lengthForPc) {
        return value.slice(0, this.lengthForPc) + '...';
      }
    }
    return value;
  }
}
