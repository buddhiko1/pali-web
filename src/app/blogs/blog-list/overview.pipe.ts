import { Pipe, PipeTransform } from '@angular/core';
import { ScreenService } from 'src/app/shared/services/screen.service';

@Pipe({
  standalone: true,
  name: 'overView',
})
export class OverViewPipe implements PipeTransform {
  lengthForPhone: number = 45;
  lengthForPc: number = 80;

  constructor(private _screenService: ScreenService) {}

  transform(value: string): string {
    if (this._screenService.isPhone) {
      if (value.length > this.lengthForPhone) {
        return value.slice(0, this.lengthForPhone) + '...';
      }
    } else {
      if (value.length > this.lengthForPc) {
        return value.slice(0, this.lengthForPc) + '...';
      }
    }
    return value;
  }
}
