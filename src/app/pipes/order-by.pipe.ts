import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../interfaces/transaction.interface';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: Transaction[]): Transaction[] {
    return Array.from(value).sort((a) => {
      if(a.type === 'income') {
        return -1
      } else {
        return 1
      }
    });
  }

}
