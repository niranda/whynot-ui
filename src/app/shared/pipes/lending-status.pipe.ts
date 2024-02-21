import { Pipe, PipeTransform } from '@angular/core';
import { LendingStatus } from 'src/app/models/biblioLending';

@Pipe({
  name: 'lendingStatus'
})

export class LendingStatusPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case LendingStatus.InRental:
        return 'В прокаті';
      case LendingStatus.Available:
        return 'Прокат завершено';
      case LendingStatus.Unavailable:
        return 'Прокат недоступний';
      default:
        return 'Невідома помилка';
    }
  }
}
