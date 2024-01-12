import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'actvieDate',
})
export class ActiveDatePipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return '';
    }
    const inputMonth = value.split(' ')[0].split('/')[0];
    const inputDay = value.split(' ')[0].split('/')[1];
    const inputPeriod = value.split(' ')[1];
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    if (inputMonth === month.toString() && inputDay === day.toString()) {
      return inputPeriod;
    } else if (
      inputMonth === month.toString() &&
      inputDay === (day - 1).toString()
    ) {
      return 'Yesterday';
    } else {
      return `${inputMonth}/${inputDay}`;
    }
  }
}
